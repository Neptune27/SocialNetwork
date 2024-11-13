using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialNetwork.Messaging.Data.Migrations
{
    /// <inheritdoc />
    public partial class GuttedFriend : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friends_BasicUser_UserFromsId",
                table: "Friends");

            migrationBuilder.DropForeignKey(
                name: "FK_Friends_BasicUser_UserTosId",
                table: "Friends");

            migrationBuilder.RenameColumn(
                name: "UserTosId",
                table: "Friends",
                newName: "UserFromId");

            migrationBuilder.RenameColumn(
                name: "UserFromsId",
                table: "Friends",
                newName: "UserToId");

            migrationBuilder.RenameIndex(
                name: "IX_Friends_UserTosId",
                table: "Friends",
                newName: "IX_Friends_UserFromId");

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_BasicUser_UserFromId",
                table: "Friends",
                column: "UserFromId",
                principalTable: "BasicUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_BasicUser_UserToId",
                table: "Friends",
                column: "UserToId",
                principalTable: "BasicUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Friends_BasicUser_UserFromId",
                table: "Friends");

            migrationBuilder.DropForeignKey(
                name: "FK_Friends_BasicUser_UserToId",
                table: "Friends");

            migrationBuilder.RenameColumn(
                name: "UserFromId",
                table: "Friends",
                newName: "UserTosId");

            migrationBuilder.RenameColumn(
                name: "UserToId",
                table: "Friends",
                newName: "UserFromsId");

            migrationBuilder.RenameIndex(
                name: "IX_Friends_UserFromId",
                table: "Friends",
                newName: "IX_Friends_UserTosId");

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_BasicUser_UserFromsId",
                table: "Friends",
                column: "UserFromsId",
                principalTable: "BasicUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Friends_BasicUser_UserTosId",
                table: "Friends",
                column: "UserTosId",
                principalTable: "BasicUser",
                principalColumn: "Id");
        }
    }
}
