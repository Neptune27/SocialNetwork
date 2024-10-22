using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialNetwork.Post.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddVisibility : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                table: "Comments",
                newName: "LastUpdated");

            migrationBuilder.AddColumn<string>(
                name: "BasicUserId",
                table: "Users",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Reactions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Reactions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "Reactions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdated",
                table: "Posts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "Posts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Visibility",
                table: "Comments",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Reactions");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Reactions");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "Reactions");

            migrationBuilder.DropColumn(
                name: "LastUpdated",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "Visibility",
                table: "Comments");

            migrationBuilder.RenameColumn(
                name: "LastUpdated",
                table: "Comments",
                newName: "UpdatedAt");
        }
    }
}
