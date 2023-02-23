import { MigrationInterface, QueryRunner } from "typeorm";

export class BigIntForClients1675815660941 implements MigrationInterface {
    name = 'BigIntForClients1675815660941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "cuit"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "cuit" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "cuit"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "cuit" integer NOT NULL`);
    }

}
