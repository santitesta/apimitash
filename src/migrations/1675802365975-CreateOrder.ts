import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrder1675802365975 implements MigrationInterface {
    name = 'CreateOrder1675802365975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_state_enum" AS ENUM('abierta', 'en progreso', 'espera respuestos', 'cerrada')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" SERIAL NOT NULL, "state" "public"."orders_state_enum" NOT NULL DEFAULT 'abierta', "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deviceId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_6bde062cabb167577b846315b07" FOREIGN KEY ("deviceId") REFERENCES "devices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_6bde062cabb167577b846315b07"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_state_enum"`);
    }

}
