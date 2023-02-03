import { MigrationInterface, QueryRunner } from "typeorm";

export class initialConfiguration1675433782000 implements MigrationInterface {
    name = 'initialConfiguration1675433782000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "role" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "devices" ("id" SERIAL NOT NULL, "serialNumber" character varying NOT NULL, "type" character varying NOT NULL, "inChargeId" integer, "ownerId" integer, CONSTRAINT "PK_b1514758245c12daf43486dd1f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "company" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "phone" integer NOT NULL, "openTime" character varying NOT NULL, "cuit" integer NOT NULL, "paymentEmail" character varying NOT NULL, "treasuryPhone" character varying NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_429740acdf8d445f2f1cc9fecdc" FOREIGN KEY ("inChargeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_968904d168816becbe1012dabcf" FOREIGN KEY ("ownerId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_968904d168816becbe1012dabcf"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_429740acdf8d445f2f1cc9fecdc"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "devices"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
