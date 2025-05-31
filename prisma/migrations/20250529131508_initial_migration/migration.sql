-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR,
    "phoneNumber" VARCHAR,
    "linkPrecedence" TEXT NOT NULL DEFAULT 'primary',
    "linkedId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_contact_email" ON "Contact"("email");

-- CreateIndex
CREATE INDEX "idx_contact_phone" ON "Contact"("phoneNumber");
