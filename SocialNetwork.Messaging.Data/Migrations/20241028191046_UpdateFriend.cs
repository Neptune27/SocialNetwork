using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialNetwork.Messaging.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateFriend : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Rooms",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "Rooms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "BasicUser",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "BasicUser",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "BasicUser",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Friends",
                columns: table => new
                {
                    UserTosId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserFromsId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Visibility = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friends", x => new { x.UserFromsId, x.UserTosId });
                    table.ForeignKey(
                        name: "FK_Friends_BasicUser_UserFromsId",
                        column: x => x.UserFromsId,
                        principalTable: "BasicUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Friends_BasicUser_UserTosId",
                        column: x => x.UserTosId,
                        principalTable: "BasicUser",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Friends_UserTosId",
                table: "Friends",
                column: "UserTosId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Friends");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "BasicUser");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "BasicUser");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "BasicUser");

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
    }
}
