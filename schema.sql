DROP DATABASE IF EXISTS fanflock;

CREATE DATABASE fanflock;

USE fanflock;

CREATE TABLE followers (
  id int NOT NULL AUTO_INCREMENT,
  userid integer NOT NULL,
  following integer NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE followed (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE usergroupnames (
  id int NOT NULL AUTO_INCREMENT,
  usergroupname varchar(50) NOT NULL UNIQUE,
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < schema.sql
 *  to create the database and the tables.*/
