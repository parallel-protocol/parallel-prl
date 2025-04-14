import assert from "assert";

import { type DeployFunction } from "hardhat-deploy/types";

const contractName = "LockBox";

const deploy: DeployFunction = async (hre) => {
  const { getNamedAccounts, deployments } = hre;

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  assert(deployer, "Missing deployer account");

  console.log(`Network: ${hre.network.name}`);
  console.log(`Deployer: ${deployer}`);

  const endpointV2Deployment = await hre.deployments.get("EndpointV2");
  const prl = await hre.deployments.get("PRL");

  const contract = await deploy(contractName, {
    from: deployer,
    args: [prl.address, endpointV2Deployment.address, deployer],
    log: true,
    skipIfAlreadyDeployed: false,
  });

  console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${contract.address}`);
};

deploy.tags = [contractName, "MainChain"];
deploy.dependencies = ["PRL"];
export default deploy;
