using Microsoft.EntityFrameworkCore.Migrations;

namespace Architecture.Database.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Auth");

            migrationBuilder.EnsureSchema(
                name: "User");

            migrationBuilder.CreateTable(
                name: "Auth",
                schema: "Auth",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Login = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Salt = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Roles = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Auth", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "User",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    AuthId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                    table.ForeignKey(
                        name: "FK_User_Auth_AuthId",
                        column: x => x.AuthId,
                        principalSchema: "Auth",
                        principalTable: "Auth",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                schema: "Auth",
                table: "Auth",
                columns: new[] { "Id", "Login", "Password", "Roles", "Salt" },
                values: new object[] { 1L, "admin", "O34uMN1Vho2IYcSM7nlXEqn57RZ8VEUsJwH++sFr0i3MSHJVx8J3PQGjhLR3s5i4l0XWUnCnymQ/EbRmzvLy8uMWREZu7vZI+BqebjAl5upYKMMQvlEcBeyLcRRTTBpYpv80m/YCZQmpig4XFVfIViLLZY/Kr5gBN5dkQf25rK+u88gtSXAyPDkW+hVS+dW4AmxrnaNFZks0Zzcd5xlb12wcF/q96cc4htHFzvOH9jtN98N5EBIXSvdUVnFc9kBuRTVytATZA7gITbs//hkxvNQ3eody5U9hjdH6D+AP0vVt5unZlTZ+gInn8Ze7AC5o6mn0Y3ylGO1CBJSHU9c/BcFY9oknn+XYk9ySCoDGctMqDbvOBcvSTBkKcrCzev2KnX7xYmC3yNz1Q5oPVKgnq4mc1iuldMlCxse/IDGMJB2FRdTCLV5KNS4IZ1GB+dw3tMvcEEtmXmgT2zKN5+kUkOxhlv5g1ZLgXzWjVJeKb5uZpsn3WK5kt8T+kzMoxHd5i8HxsU2uvy9GopxAnaV0WNsBPqTGkRllSxARl4ZN3hJqUla553RT49tJxbs+N03OmkYhjq+L0aKJ1AC+7G+rdjegiAQZB+3mdE7a2Pne2kYtpMoCmNMKdm9jOOVpfXJqZMQul9ltJSlAY6LPrHFUB3mw61JBNzx+sZgYN29GfDY=", 3, "79005744-e69a-4b09-996b-08fe0b70cbb9" });

            migrationBuilder.InsertData(
                schema: "User",
                table: "User",
                columns: new[] { "Id", "AuthId", "Status", "Email", "FirstName", "LastName" },
                values: new object[] { 1L, 1L, 1, "administrator@administrator.com", "Administrator", "Administrator" });

            migrationBuilder.CreateIndex(
                name: "IX_Auth_Login",
                schema: "Auth",
                table: "Auth",
                column: "Login",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_AuthId",
                schema: "User",
                table: "User",
                column: "AuthId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_Email",
                schema: "User",
                table: "User",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "User",
                schema: "User");

            migrationBuilder.DropTable(
                name: "Auth",
                schema: "Auth");
        }
    }
}
