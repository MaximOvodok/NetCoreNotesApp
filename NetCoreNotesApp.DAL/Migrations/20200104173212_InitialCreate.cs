using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace NetCoreNotesApp.DAL.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NotesTags",
                columns: table => new
                {
                    NoteId = table.Column<int>(nullable: false),
                    TagId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotesTags", x => new { x.NoteId, x.TagId });
                }
            );

            migrationBuilder.AddForeignKey(
                name: "FK_NotesTagsNotes",
                table: "NotesTags",
                column: "NoteId",
                principalTable: "Notes",
                principalColumn: "Id");
            migrationBuilder.AddForeignKey(
                name: "FK_NotesTagsTags",
                table: "NotesTags",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "Id");

            migrationBuilder.DropForeignKey("FK_Tags_Notes_NoteId", "Tags");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tags");

            migrationBuilder.DropTable(
                name: "Notes");

            migrationBuilder.DropTable(
                name: "Severities");
        }
    }
}
