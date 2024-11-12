using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialNetwork.Post.Data.Migrations
{
    /// <inheritdoc />
    public partial class Update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_BasicUserId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_BasicUserId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BasicUserId",
                table: "Users");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "CommentReactions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "CommentReactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "BasicUserBasicUser",
                columns: table => new
                {
                    FriendOfId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FriendsId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BasicUserBasicUser", x => new { x.FriendOfId, x.FriendsId });
                    table.ForeignKey(
                        name: "FK_BasicUserBasicUser_Users_FriendOfId",
                        column: x => x.FriendOfId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BasicUserBasicUser_Users_FriendsId",
                        column: x => x.FriendsId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BasicUserBasicUser_FriendsId",
                table: "BasicUserBasicUser",
                column: "FriendsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BasicUserBasicUser");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "CommentReactions");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "CommentReactions");

            migrationBuilder.AddColumn<string>(
                name: "BasicUserId",
                table: "Users",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_BasicUserId",
                table: "Users",
                column: "BasicUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Users_BasicUserId",
                table: "Users",
                column: "BasicUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
