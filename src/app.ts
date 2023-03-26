import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Endpoint para adicionar um novo carro ao banco de dados
app.post("/car", async (req: Request, res: Response) => {
  const { make, model, year } = req.body;
  try {
    const car = await prisma.car.create({
      data: {
        make,
        bodyStyle: model,
        year,
      },
    });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Endpoint para adicionar um novo cliente ao banco de dados
app.post("/customer", async (req: Request, res: Response) => {
  const { name, email, phoneNumber, password } = req.body;
  try {
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phoneNumber,
        password,
      },
    });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Endpoint para atualizar as informações de um cliente no banco de dados
app.put("/customer/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phoneNumber, password } = req.body;
  try {
    const customer = await prisma.customer.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        phoneNumber,
        password,
      },
    });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Endpoint para atualizar as informações de um carro no banco de dados
app.put("/car/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { make, model, year, value } = req.body;
  try {
    const car = await prisma.car.update({
      where: { id: parseInt(id) },
      data: {
        make,
        bodyStyle: model,
        year,
        value,
      },
    });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Endpoint para excluir um carro do banco de dados
app.delete("/car/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.car.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Carro excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Endpoint para excluir um cliente do banco de dados
app.delete("/customer/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.customer.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Cliente excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.post("/person", async (req: Request, res: Response) => {
  const { name, email, phoneNumber, password } = req.body;

  try {
    const person = await prisma.customer.create({
      data: {
        name,
        email,
        phoneNumber,
        password,
      },
    });

    res.json(person);
  } catch (error) {
    res.status(500).send("Erro ao criar pessoa");
  }
});

app.put("/person/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, phoneNumber, password } = req.body;

  try {
    const person = await prisma.customer.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        phoneNumber,
        password,
      },
    });

    res.json(person);
  } catch (error) {
    res.status(500).send("Erro ao atualizar pessoa");
  }
});

app.delete("/person/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.customer.delete({
      where: { id: parseInt(id) },
    });

    res.send("Pessoa excluída com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao excluir pessoa");
  }
});

app.post("/rent", async (req: Request, res: Response) => {
  const { carId, customerId, startDate, endDate } = req.body;

  try {
    const rent = await prisma.order.create({
      data: {
        car: { connect: { id: parseInt(carId) } },
        customer: { connect: { id: parseInt(customerId) } },
        startDate,
        endDate,
        status: "Pendente",
      },
    });

    res.json(rent);
  } catch (error) {
    res.status(500).send("Erro ao alugar carro");
  }
});

app.put("/rent/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const rent = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json(rent);
  } catch (error) {
    res.status(500).send("Erro ao atualizar status de aluguel");
  }
});
// Endpoint para listar todos os clientes do banco de dados
app.get("/customers", async (req: Request, res: Response) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Endpoint para listar todos os carros do banco de dados
app.get("/cars", async (req: Request, res: Response) => {
  try {
    const cars = await prisma.car.findMany();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Endpoint para recuperar as informações de um carro específico pelo ID
app.get("/car/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const car = await prisma.car.findUnique({
      where: { id: parseInt(id) },
    });
    if (!car) {
      return res.status(404).json({ message: "Carro não encontrado" });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.listen(3000, () => {
  console.log("Aplicação rodando na porta 3000");
});
