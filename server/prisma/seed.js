const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Seed depatments
  await prisma.department.createMany({
    data: [
      {
        id: 1,
        name: "Technical",
      },
      {
        id: 2,
        name: "Operations",
      },
      {
        name: "Finance",
        id: 3,
      },
    ],
  });

  // Seed designations
  await prisma.designation.createMany({
    data: [
      {
        name: "Software Developer",
        deptid: 1,
      },
      {
        name: "Data Engineer",
        deptid: 1,
      },
      {
        name: "HR",
        deptid: 2,
      },
      {
        name: "Sales Executive",
        deptid: 3,
      },
      {
        name: "IT Specialist",
        deptid: 2,
      },
      {
        name: "Customer Support",
        deptid: 2,
      },
      {
        name: "Project Manager",
        deptid: 1,
      },
      {
        name: "Financial Analyst",
        deptid: 3,
      },
    ],
  });

  console.log("Seeding complete");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error seeding data:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
