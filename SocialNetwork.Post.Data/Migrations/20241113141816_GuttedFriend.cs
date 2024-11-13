﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialNetwork.Post.Data.Migrations
{
    /// <inheritdoc />
    public partial class GuttedFriend : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BasicUserBasicUser");

            migrationBuilder.CreateTable(
                name: "Friends",
                columns: table => new
                {
                    UserToId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserFromId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Visibility = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friends", x => new { x.UserToId, x.UserFromId });
                    table.ForeignKey(
                        name: "FK_Friends_Users_UserFromId",
                        column: x => x.UserFromId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Friends_Users_UserToId",
                        column: x => x.UserToId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Friends_UserFromId",
                table: "Friends",
                column: "UserFromId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Friends");

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
    }
}
