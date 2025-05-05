import fastify from "fastify";

const server = fastify({
  logger: true});

const teams = [
  {
    id: 1,
    name: "Ferrari",
    base: "Maranello"
  },
  {
    id: 2,
    name: "Red Bull",
    base: "Milton Keynes"
  }
]

const drivers = [
  {
    id: 1,
    name: "Max Verstappen",
    team: {
      id: 2,
      name: "Red Bull"
    }

  },
  {
    id: 2,
    name: "Charles Leclerc",
    team: {
      id: 1,
      name: "Ferrari"
    }
  }
]

server.get("/teams", async(request, response) => {
  response.type("application/json").code(200)

  return { teams }
});

server.get("/drivers", async(request, response) => {
  response.type("application/json").code(200)

  return { drivers }
  })

interface DriverParams {
  id: string
}


server.get<{Params: DriverParams}>("/drivers/:id", async(request, response) => {
  response.type("application/json").code(200)

  const id = parseInt(request.params.id)
  const driver = drivers.find(driver => driver.id == id)
  
  if(!driver) {
    response.code(404)
    return { message: "Driver not found" }
  }else{
    response.type("application/json").code(200)
    return { driver }
  }
  })








server.listen({
  port: 3333,
}, () => {
  console.log("HTTP Server running!");
});