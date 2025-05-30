import { PrismaClient, Contact } from '@prisma/client';
import { verifyEmail,verifyPhone } from '../utils/validates';

const prisma = new PrismaClient();

export interface ConsolidatedContact {
  primaryContactId: number;
  emails: string[];
  phoneNumbers: string[];
  secondaryContactIds: number[];
}

export async function identifyContact(
  rawEmail?: string,
  rawPhone?: string
): Promise<ConsolidatedContact> {
  if (!rawEmail && !rawPhone) {
    throw new Error('Either email or phoneNumber must be provided');
  }

  const email = rawEmail ? verifyEmail(rawEmail) : null;
  const phoneNumber = rawPhone ? verifyPhone(rawPhone) : null;

  return await prisma.$transaction(async (tx) => {
    const matches = await tx.contact.findMany({
      where: {
        deletedAt: null,
        OR: [
          email ? { email } : {},
          phoneNumber ? { phoneNumber } : {},
        ],
      },
      orderBy: { createdAt: 'asc' },
    });

    if (matches.length === 0) {
      const created = await tx.contact.create({
        data: {
          email,
          phoneNumber,
          linkPrecedence: 'primary',
        },
      });
      return {
        primaryContactId: created.id,
        emails: created.email ? [created.email] : [],
        phoneNumbers: created.phoneNumber ? [created.phoneNumber] : [],
        secondaryContactIds: [],
      };
    }

    const primariesInMatches = matches.filter(
      (c) => c.linkPrecedence === 'primary'
    );

    let primary: Contact;
    let allPrimariesToMerge: Contact[] = [];

    if (primariesInMatches.length > 0) {
      primary = primariesInMatches.reduce((oldest, c) =>
        c.createdAt < oldest.createdAt ? c : oldest
      );

      allPrimariesToMerge = primariesInMatches.filter(
        (c) => c.id !== primary.id
      );
    } else {
      const distinctLinkedIds = Array.from(
        new Set(matches.map((c) => {
          if (!c.linkedId) {
            throw new Error(
              'Inconsistent state: found a secondary with no linkedId'
            );
          }
          return c.linkedId;
        }))
      );

      const fetchedPrimaries = await tx.contact.findMany({
        where: {
          deletedAt: null,
          id: { in: distinctLinkedIds },
        },
        orderBy: { createdAt: 'asc' },
      });

      if (fetchedPrimaries.length === 0) {
        throw new Error(
          'Inconsistent state: no primary found for matched secondaries'
        );
      }

      primary = fetchedPrimaries.reduce((oldest, c) =>
        c.createdAt < oldest.createdAt ? c : oldest
      );

      allPrimariesToMerge = fetchedPrimaries.filter(
        (c) => c.id !== primary.id
      );
    }

    for (const dup of allPrimariesToMerge) {
      await tx.contact.update({
        where: { id: dup.id },
        data: {
          linkPrecedence: 'secondary',
          linkedId: primary.id,
          updatedAt: new Date(),
        },
      });

      await tx.contact.updateMany({
        where: { linkedId: dup.id },
        data: { linkedId: primary.id },
      });
    }

    let chain = await tx.contact.findMany({
      where: {
        deletedAt: null,
        OR: [{ id: primary.id }, { linkedId: primary.id }],
      },
      orderBy: { createdAt: 'asc' },
    });

    const existingEmails = new Set(
      chain.map((c) => c.email).filter((e): e is string => !!e)
    );
    const existingPhones = new Set(
      chain.map((c) => c.phoneNumber).filter((p): p is string => !!p)
    );

    let newContact: Contact | null = null;
    if (
      (email && !existingEmails.has(email)) ||
      (phoneNumber && !existingPhones.has(phoneNumber))
    ) {
      newContact = await tx.contact.create({
        data: {
          email,
          phoneNumber,
          linkPrecedence: 'secondary',
          linkedId: primary.id,
        },
      });
      chain.push(newContact);
    }

    const secondaryRows = chain.filter((c) => c.id !== primary.id);
    const uniqueEmails = [
      ...(primary.email ? [primary.email] : []),
      ...secondaryRows.map((c) => c.email).filter((e): e is string => !!e),
    ];
    const uniquePhones = [
      ...(primary.phoneNumber ? [primary.phoneNumber] : []),
      ...secondaryRows
        .map((c) => c.phoneNumber)
        .filter((p): p is string => !!p),
    ];

    return {
      primaryContactId: primary.id,
      emails: Array.from(new Set(uniqueEmails)),
      phoneNumbers: Array.from(new Set(uniquePhones)),
      secondaryContactIds: secondaryRows.map((c) => c.id),
    };
  });
}
