﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SocialNetwork.Messaging.Data;

#nullable disable

namespace SocialNetwork.Messaging.Data.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20241028191046_UpdateFriend")]
    partial class UpdateFriend
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("MessageUserRoom", b =>
                {
                    b.Property<int>("RoomsId")
                        .HasColumnType("int");

                    b.Property<string>("UsersId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("RoomsId", "UsersId");

                    b.HasIndex("UsersId");

                    b.ToTable("MessageUserRoom");
                });

            modelBuilder.Entity("SocialNetwork.Core.Models.BasicFriend", b =>
                {
                    b.Property<string>("UserFromsId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("UserTosId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("LastUpdated")
                        .HasColumnType("datetime2");

                    b.Property<int>("Visibility")
                        .HasColumnType("int");

                    b.HasKey("UserFromsId", "UserTosId");

                    b.HasIndex("UserTosId");

                    b.ToTable("Friends");
                });

            modelBuilder.Entity("SocialNetwork.Core.Models.BasicUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(13)
                        .HasColumnType("nvarchar(13)");

                    b.Property<DateTime>("LastUpdated")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Picture")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Visibility")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("BasicUser");

                    b.HasDiscriminator().HasValue("BasicUser");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("SocialNetwork.Messaging.Data.Models.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("LastUpdated")
                        .HasColumnType("datetime2");

                    b.Property<int>("MessageType")
                        .HasColumnType("int");

                    b.Property<int?>("ReplyToId")
                        .HasColumnType("int");

                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Visibility")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ReplyToId")
                        .IsUnique()
                        .HasFilter("[ReplyToId] IS NOT NULL");

                    b.HasIndex("RoomId");

                    b.HasIndex("UserId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("SocialNetwork.Messaging.Data.Models.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedById")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("LastUpdated")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Profile")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoomType")
                        .HasColumnType("int");

                    b.Property<int>("Visibility")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("SocialNetwork.Messaging.Data.Models.RoomLastSeen", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("RoomId")
                        .HasColumnType("int");

                    b.Property<DateTime>("LastSeen")
                        .HasColumnType("datetime2");

                    b.HasKey("UserId", "RoomId");

                    b.HasIndex("RoomId");

                    b.ToTable("RoomsLastSeen");
                });

            modelBuilder.Entity("SocialNetwork.Messaging.Data.Models.MessageUser", b =>
                {
                    b.HasBaseType("SocialNetwork.Core.Models.BasicUser");

                    b.HasDiscriminator().HasValue("MessageUser");
                });

            modelBuilder.Entity("MessageUserRoom", b =>
                {
                    b.HasOne("SocialNetwork.Messaging.Data.Models.Room", null)
                        .WithMany()
                        .HasForeignKey("RoomsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SocialNetwork.Messaging.Data.Models.MessageUser", null)
                        .WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SocialNetwork.Core.Models.BasicFriend", b =>
                {
                    b.HasOne("SocialNetwork.Core.Models.BasicUser", null)
                        .WithMany()
                        .HasForeignKey("UserFromsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SocialNetwork.Core.Models.BasicUser", null)
                        .WithMany()
                        .HasForeignKey("UserTosId")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SocialNetwork.Messaging.Data.Models.Message", b =>
                {
                    b.HasOne("SocialNetwork.Messaging.Data.Models.Message", "ReplyTo")
                        .WithOne()
                        .HasForeignKey("SocialNetwork.Messaging.Data.Models.Message", "ReplyToId")
                        .OnDelete(DeleteBehavior.NoAction);

                    b.HasOne("SocialNetwork.Messaging.Data.Models.Room", "Room")
                        .WithMany("Messages")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SocialNetwork.Core.Models.BasicUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId");

                    b.Navigation("ReplyTo");

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SocialNetwork.Messaging.Data.Models.Room", b =>
                {
                    b.HasOne("SocialNetwork.Core.Models.BasicUser", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.Navigation("CreatedBy");
                });

            modelBuilder.Entity("SocialNetwork.Messaging.Data.Models.RoomLastSeen", b =>
                {
                    b.HasOne("SocialNetwork.Messaging.Data.Models.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("SocialNetwork.Messaging.Data.Models.MessageUser", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");

                    b.Navigation("User");
                });

            modelBuilder.Entity("SocialNetwork.Messaging.Data.Models.Room", b =>
                {
                    b.Navigation("Messages");
                });
#pragma warning restore 612, 618
        }
    }
}
