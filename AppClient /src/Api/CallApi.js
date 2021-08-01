import mushroom from "mushroomjs";
// import "mushroomjs-auth-rn";
import "mushroomjs-file";
import LinkApi from "../Config/ServerConfig";

mushroom._defineAsyncResource({
    name: "timer",
    actions: {
      findMany: { clientCache: true },
      findById: { clientCache: true },
      createOne: {},
      updatePartially: {}
    },
    views: {}
  });
mushroom.$using(LinkApi);
export default mushroom;