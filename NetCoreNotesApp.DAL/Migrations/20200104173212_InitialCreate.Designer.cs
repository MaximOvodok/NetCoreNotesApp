﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetCoreNotesApp.DAL.Core;

namespace NetCoreNotesApp.DAL.Migrations
{
    [DbContext(typeof(NotesContext))]
    [Migration("20200104173212_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("NetCoreNotesApp.DAL.Entities.Note", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("SeverityId");

                    b.Property<string>("Text");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("SeverityId");

                    b.ToTable("Notes");
                });

            modelBuilder.Entity("NetCoreNotesApp.DAL.Entities.Severity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Text");

                    b.HasKey("Id");

                    b.ToTable("Severities");
                });

            modelBuilder.Entity("NetCoreNotesApp.DAL.Entities.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<int?>("NoteId");

                    b.HasKey("Id");

                    b.HasIndex("NoteId");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("NetCoreNotesApp.DAL.Entities.Note", b =>
                {
                    b.HasOne("NetCoreNotesApp.DAL.Entities.Severity", "Severity")
                        .WithMany("Notes")
                        .HasForeignKey("SeverityId");
                });

            modelBuilder.Entity("NetCoreNotesApp.DAL.Entities.Tag", b =>
                {
                    b.HasOne("NetCoreNotesApp.DAL.Entities.Note", "Note")
                        .WithMany("Tags")
                        .HasForeignKey("NoteId");
                });
#pragma warning restore 612, 618
        }
    }
}
