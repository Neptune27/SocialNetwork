using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialNetwork.Messaging.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddFriends : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BasicUserId",
                table: "BasicUser",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BasicUser_BasicUserId",
                table: "BasicUser",
                column: "BasicUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_BasicUser_BasicUser_BasicUserId",
                table: "BasicUser",
                column: "BasicUserId",
                principalTable: "BasicUser",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BasicUser_BasicUser_BasicUserId",
                table: "BasicUser");

            migrationBuilder.DropIndex(
                name: "IX_BasicUser_BasicUserId",
                table: "BasicUser");

            migrationBuilder.DropColumn(
                name: "BasicUserId",
                table: "BasicUser");
        }
    }
}
