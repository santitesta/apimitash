import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1675114030651 implements MigrationInterface {
  name = 'SeedDb1675114030651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // Password is asdf
      `INSERT INTO users (username, email, role , password) VALUES ('santi', 'santi@mail.com', 'Tecnico', '$2b$10$CaXOxiyMv//b3a/fgUra9udBZxgW8ZkZ9Ku69QgZY8eU7Wf7LyNGu')`,
    );

    await queryRunner.query(
      `INSERT INTO clients (name, email, company, address, phone, "openTime", cuit, "paymentEmail", "treasuryPhone") VALUES ('Anlis', 'anlis@anlis.com', 'Malbran', 'Entre Rios entre Amoedo y Suarez', '1152524343', '7 a 15', '20317932117', 'pagos@anlis.com', '1190908383')`,
    );

    await queryRunner.query(
      `INSERT INTO devices ("serialNumber", type, "ownerId") VALUES ('EB250562', 'Freezer', '1')`,
    );

    await queryRunner.query(
      `INSERT INTO orders (description, "deviceId") VALUES ('Un caño tiene una fractura', '1')`,
    );
  }

  public async down(): Promise<void> {}
}
