import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTemplates1688414796806 implements MigrationInterface {
    name = 'AlterTemplates1688414796806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "informations"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "layout"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "fontColor"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "templates" ADD "fontColor" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "layout" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "informations" json NOT NULL`);
    }

}
