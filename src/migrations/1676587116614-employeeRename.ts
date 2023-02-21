import { MigrationInterface, QueryRunner } from "typeorm";

export class employeeRename1676587116614 implements MigrationInterface {
    name = 'employeeRename1676587116614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_429740acdf8d445f2f1cc9fecdc"`);
        await queryRunner.query(`CREATE TABLE "employees" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "role" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_765bc1ac8967533a04c74a9f6af" UNIQUE ("email"), CONSTRAINT "UQ_31358a1a133482b25fe81b021eb" UNIQUE ("username"), CONSTRAINT "PK_b9535a98350d5b26e7eb0c26af4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "inChargeId"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "employeeId" integer`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_59fadea46c0451b6663017f4c51" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_59fadea46c0451b6663017f4c51"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "UQ_b48860677afe62cd96e12659482"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "employeeId"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "inChargeId" integer`);
        await queryRunner.query(`DROP TABLE "employees"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_429740acdf8d445f2f1cc9fecdc" FOREIGN KEY ("inChargeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
