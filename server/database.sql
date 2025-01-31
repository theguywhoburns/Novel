-- create database novel
-- LC_COLLATE 'ru_RU.UTF-8'
-- LC_CTYPE 'ru_RU.UTF-8'
-- TEMPLATE template0;

CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "bDate" DATE,
  "uploadedImages" TEXT,
  "lat" DECIMAL(10, 7),
  "lon" DECIMAL(10, 7),
  "gender" VARCHAR(20),
  "description" TEXT,
  "city" VARCHAR(255),
  "company" VARCHAR(255),
  "education" VARCHAR(255),
  "growth" TEXT,
  "interests" TEXT,
  "jobPosition" VARCHAR(255),
  "languages" VARCHAR(255),
  "mediaLinks" TEXT,
  "familyPlans" TEXT,
  "orientation" TEXT,
  "relationshipGoals" TEXT,
  "sport" TEXT,
  "alcohol" TEXT,
  "smoke" TEXT,
  "personalityType" TEXT,
  "socialMediaLinks" TEXT,
  "status" VARCHAR(50),
  "subscriptionType" VARCHAR(50),
  "zodiacSign" VARCHAR(50),
  "searchGoal" TEXT,
  "playlist" TEXT,
  "talkStyle" TEXT,
  "loveLang" TEXT,
  "pets" TEXT,
  "food" TEXT,
  "isOnline" BOOLEAN NOT NULL DEFAULT FALSE,
  "isVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  "balance" DECIMAL(10, 2) DEFAULT 0.00
);

CREATE TABLE IF NOT EXISTS "cards" (
  "id" SERIAL PRIMARY KEY,
  "personalId" VARCHAR(255) NOT NULL,
  "number" VARCHAR(16) NOT NULL,
  "expiryDate" DATE NOT NULL,
  "cvv" CHAR(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "places" (
  "id" SERIAL PRIMARY KEY,
  "categoryName" VARCHAR(255) NOT NULL,
  "cityName" VARCHAR(255) NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "image" TEXT,
  "address" VARCHAR(255),
  "link" VARCHAR(255),
  "geoLat" FLOAT NOT NULL,
  "geoLon" FLOAT NOT NULL,
  "rate" FLOAT NOT NULL
);

CREATE TABLE IF NOT EXISTS "likes" (
  "id" SERIAL PRIMARY KEY,
  "raterId" INT NOT NULL,
  "ratedId" INT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("raterId") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY ("ratedId") REFERENCES "users"("id") ON DELETE CASCADE,
  UNIQUE ("raterId", "ratedId")
);

CREATE TABLE IF NOT EXISTS "dislikes" (
  "id" SERIAL PRIMARY KEY,
  "raterId" INT NOT NULL,
  "ratedId" INT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("raterId") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY ("ratedId") REFERENCES "users"("id") ON DELETE CASCADE,
  UNIQUE ("raterId", "ratedId")
);

CREATE TABLE IF NOT EXISTS "matches" (
  "id" SERIAL PRIMARY KEY,
  "userOneId" INT NOT NULL,
  "userTwoId" INT NOT NULL,
  FOREIGN KEY ("userOneId") REFERENCES "users"("id"),
  FOREIGN KEY ("userTwoId") REFERENCES "users"("id"),
  UNIQUE ("userOneId", "userTwoId") 
); --do we need for this table?

CREATE TABLE IF NOT EXISTS "chats" (
  "id" SERIAL PRIMARY KEY,
  "userOneId" INT NOT NULL,
  "userTwoId" INT NOT NULL,
  "isMuted" BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY ("userOneId") REFERENCES "users"("id") ON DELETE CASCADE,
  FOREIGN KEY ("userTwoId") REFERENCES "users"("id") ON DELETE CASCADE,
  UNIQUE ("userOneId", "userTwoId")
);

CREATE TABLE IF NOT EXISTS "messages" (
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

CREATE TABLE IF NOT EXISTS "transactions" (
  "id" SERIAL PRIMARY KEY,
  "fromUserId" INT NOT NULL,
  "toUserId" INT NOT NULL,
  "amount" DECIMAL(10, 2) NOT NULL,
  "item" VARCHAR(255),
  "transactionDate" TIMESTAMP NOT NULL,
  FOREIGN KEY ("fromUserId") REFERENCES "users"("id"),
  FOREIGN KEY ("toUserId") REFERENCES "users"("id")
);

CREATE TABLE IF NOT EXISTS "credentials" (
  "id" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "email" VARCHAR(255) UNIQUE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "verificationCode" VARCHAR(4),
  "lastLogin" TIMESTAMP NULL,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "settings" (
  "id" SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "distanceRange" INT4RANGE DEFAULT '[0, 100]',
  "showPeopleInDistance" BOOLEAN DEFAULT FALSE,
  "ageRange" INT4RANGE DEFAULT '[18, 99]',
  "showPeopleInAge" BOOLEAN DEFAULT FALSE,
  "showMeToMen" BOOLEAN DEFAULT TRUE,
  "showMeToWomen" BOOLEAN DEFAULT TRUE,
  "showVerifiedOnly" BOOLEAN DEFAULT FALSE,
  "interests" TEXT,
  "zodiacSign" TEXT,
  "searchGoal" TEXT,
  "education" TEXT,
  "familyPlans" TEXT,
  "sport" TEXT,
  "alcohol" TEXT,
  "smoke" TEXT,
  "personalityType" TEXT,
  "foodPreferences" TEXT,
  "pets" TEXT,
  "communicationStyle" TEXT,
  "socialNetworks" TEXT,
  "loveLanguage" TEXT,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION range_to_inclusive_string(r INT4RANGE)
	RETURNS TEXT AS $$
		BEGIN
			RETURN '[' || lower(r) || ', ' || upper(r) -1 || ']';
		END;
	$$ LANGUAGE plpgsql IMMUTABLE;