-- create database novel
-- LC_COLLATE 'ru_RU.UTF-8'
-- LC_CTYPE 'ru_RU.UTF-8'
-- TEMPLATE template0;

CREATE TABLE "cards" (
  "id" SERIAL PRIMARY KEY,
  "personalId" VARCHAR(255) NOT NULL,
  "number" VARCHAR(16) NOT NULL,
  "expiryDate" DATE NOT NULL,
  "cvv" CHAR(3) NOT NULL
);

CREATE TABLE "cities" (
  "id" SERIAL PRIMARY KEY,
  "address" VARCHAR(255) NOT NULL,
  "postalCode" VARCHAR(255) NOT NULL,
  "cityName" VARCHAR(255) NOT NULL,
  "geoLat" FLOAT NOT NULL,
  "geoLon" FLOAT NOT NULL
);

CREATE TABLE "places" (
  "id" SERIAL PRIMARY KEY,
  "categoryId" INT NOT NULL,
  "cityId" INT NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "image" TEXT,
  "address" VARCHAR(255),
  "link" VARCHAR(255),
  "geoLat" FLOAT NOT NULL,
  "geoLon" FLOAT NOT NULL,
  FOREIGN KEY ("cityId") REFERENCES "cities"("id")
);

CREATE TABLE "matches" (
  "id" SERIAL PRIMARY KEY,
  "userOne" INT NOT NULL,
  "userTwo" INT NOT NULL,
  FOREIGN KEY ("userOne") REFERENCES "users"("id"),
  FOREIGN KEY ("userTwo") REFERENCES "users"("id")
);

CREATE TABLE "chats" (
  "id" SERIAL PRIMARY KEY,
  "userOneId" INT NOT NULL,
  "userTwoId" INT NOT NULL,
  "isMuted" BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY ("userOneId") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY ("userTwoId") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "chatId" INTEGER NOT NULL,
  "senderId" INTEGER NOT NULL,
  "recipientId" INTEGER NOT NULL,
  "type" VARCHAR(50) NOT NULL,
  "text" TEXT,
  "createdAt" TIMESTAMP NOT NULL,
  "status" VARCHAR(50) NOT NULL,
  "replyToMessageId" INTEGER,
  FOREIGN KEY ("replyToMessageId") REFERENCES "messages"("id") ON DELETE SET NULL,
  FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE CASCADE,
  FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE TABLE "transactions" (
  "id" SERIAL PRIMARY KEY,
  "fromUserId" INT NOT NULL,
  "toUserId" INT NOT NULL,
  "amount" DECIMAL(10, 2) NOT NULL,
  "item" VARCHAR(255),
  "transactionDate" TIMESTAMP NOT NULL,
  FOREIGN KEY ("fromUserId") REFERENCES "users"("id"),
  FOREIGN KEY ("toUserId") REFERENCES "users"("id")
);

CREATE TABLE "credentials" (
  "credentialId" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "verificationCode" VARCHAR(6),
  "lastLogin" TIMESTAMP NULL,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "bDate" DATE NOT NULL,
  "imgSrc" TEXT,
  "gender" VARCHAR(20) NOT NULL,
  "about" TEXT NOT NULL,
  "city" VARCHAR(255) NOT NULL,
  "company" VARCHAR(255),
  "education" VARCHAR(255),
  "growth" TEXT,
  "interests" TEXT,
  "job" VARCHAR(255),
  "languages" VARCHAR(255),
  "mediaLinks" TEXT,
  "familyPlans" TEXT,
  "relationshipGoals" TEXT,
  "sports" TEXT,
  "alcohol" TEXT,
  "smoke" TEXT,
  "personalityType" TEXT,
  "socialMediaLinks" TEXT,
  "status" VARCHAR(50),
  "subscriptionType" VARCHAR(50),
  "zodiacSign" VARCHAR(50),
  "playlist" TEXT,
  "location" TEXT,
  "talkStyle" TEXT,
  "loveLang" TEXT,
  "pets" TEXT,
  "food" TEXT,
  "isOnline" BOOLEAN NOT NULL DEFAULT FALSE,
  "balance" DECIMAL(10, 2) DEFAULT 0.00
);