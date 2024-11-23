using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialNetwork.Post.Data.Migrations
{
    /// <inheritdoc />
    public partial class ReplyToNullableAndBackground : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Comments_ReplyToId",
                table: "Comments");

            migrationBuilder.AddColumn<string>(
                name: "Background",
                table: "Posts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "ReplyToId",
                table: "Comments",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ReplyToId",
                table: "Comments",
                column: "ReplyToId",
                unique: true,
                filter: "[ReplyToId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Comments_ReplyToId",
                table: "Comments");

            migrationBuilder.DropColumn(
                name: "Background",
                table: "Posts");

            migrationBuilder.AlterColumn<int>(
                name: "ReplyToId",
                table: "Comments",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ReplyToId",
                table: "Comments",
                column: "ReplyToId",
                unique: true);
        }
    }
}
