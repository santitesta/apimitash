import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedDb1675114030651 implements MigrationInterface {
  name = "SeedDb1675114030651";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO employees (username, email, role , password) VALUES ('Santiago Testa', 'santi@mail.com', 'Administrador', '$2b$10$o5c7Nj77PT.9Us0itbeKS.l3i92zPqDsdyFtPUsKlC9EzjmaRUCY2'), ('Claudio De Antoni', 'claudio@mail.com', 'Gerente', '$2b$10$sEFoW0kMa1qJk9IaPME3vuk3P1F30i/JhIVRa1oJSnHMq6hu7.Wxi')`
    );

    await queryRunner.query(
      `INSERT INTO clients (name, email, company, address, phone, "openTime", cuit, "paymentEmail", "treasuryPhone") VALUES ('Anlis', 'anlis@anlis.com', 'Malbran', 'Entre Rios entre Amoedo y Suarez', '1152524343', '7 a 15', '20317932117', 'pagos@anlis.com', '1190908383')`
    );

    await queryRunner.query(
      `INSERT INTO devices ("serialNumber", type, "ownerId") VALUES ('EB250562', 'Freezer', '1')`
    );

    await queryRunner.query(
      `INSERT INTO orders (description, "deviceId") VALUES ('Tiene una fractura', '1')`
    );
  }

  public async down(): Promise<void> {}
}
