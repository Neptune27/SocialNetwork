using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialNetwork.Messaging.Data.Migrations
{
    /// <inheritdoc />
    public partial class ReplyToOptional : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Messages_ReplyToId",
                table: "Messages");

            migrationBuilder.AlterColumn<int>(
                name: "ReplyToId",
                table: "Messages",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReplyToId",
                table: "Messages",
                column: "ReplyToId",
                unique: true,
                filter: "[ReplyToId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Messages_ReplyToId",
                table: "Messages");

            migrationBuilder.AlterColumn<int>(
                name: "ReplyToId",
                table: "Messages",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ReplyToId",
                table: "Messages",
                column: "ReplyToId",
                unique: true);
        }
    }
}
