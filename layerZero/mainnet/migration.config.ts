import { EndpointId } from "@layerzerolabs/lz-definitions";

import type { OAppOmniGraphHardhat, OmniPointHardhat } from "@layerzerolabs/toolbox-hardhat";

const mainnetContract: OmniPointHardhat = {
  eid: EndpointId.ETHEREUM_V2_MAINNET,
  contractName: "PrincipalMigrationContract",
};

const fantomContract: OmniPointHardhat = {
  eid: EndpointId.FANTOM_V2_MAINNET,
  contractName: "PeripheralMigrationContract",
};
const polygonContract: OmniPointHardhat = {
  eid: EndpointId.POLYGON_V2_MAINNET,
  contractName: "PeripheralMigrationContract",
};

const config: OAppOmniGraphHardhat = {
  contracts: [
    {
      contract: mainnetContract,
    },
    {
      contract: polygonContract,
    },
    {
      contract: fantomContract,
    },
  ],
  connections: [
    // FTM to Mainnet
    {
      from: fantomContract,
      to: mainnetContract,
      config: {
        sendLibrary: "0xC17BaBeF02a937093363220b0FB57De04A535D5E",
        sendConfig: {
          executorConfig: { maxMessageSize: 10000, executor: "0x2957eBc0D2931270d4a539696514b047756b3056" },
          ulnConfig: {
            confirmations: BigInt(25),
            requiredDVNs: ["0xe60a3959ca23a92bf5aaf992ef837ca7f828628a", "0x31f748a368a893bdb5abb67ec95f232507601a73"],
            optionalDVNs: ["0x3b247f1b48f055ebf2db593672b98c9597e3081e", "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc"],
            optionalDVNThreshold: 1,
          },
        },
      },
    },
    // Mainnet to FTM
    {
      from: mainnetContract,
      to: fantomContract,
      config: {
        receiveLibraryConfig: { receiveLibrary: "0xc02Ab410f0734EFa3F14628780e6e695156024C2", gracePeriod: 0n },
        receiveConfig: {
          ulnConfig: {
            confirmations: BigInt(25),
            requiredDVNs: ["0x589dedbd617e0cbcb916a9223f4d1300c294236b", "0xa59ba433ac34d2927232918ef5b2eaafcf130ba5"],
            optionalDVNs: ["0xc9ca319f6da263910fd9b037ec3d817a814ef3d8", "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc"],
            optionalDVNThreshold: 1,
          },
        },
      },
    },
    // Polygon to Mainnet
    {
      from: polygonContract,
      to: mainnetContract,
      config: {
        sendLibrary: "0x6c26c61a97006888ea9E4FA36584c7df57Cd9dA3",
        sendConfig: {
          executorConfig: { maxMessageSize: 10000, executor: "0xCd3F213AD101472e1713C72B1697E727C803885b" },
          ulnConfig: {
            confirmations: BigInt(512),
            requiredDVNs: ["0x23de2fe932d9043291f870324b74f820e11dc81a", "0x31f748a368a893bdb5abb67ec95f232507601a73"],
            optionalDVNs: ["0x02152f4624596602dcbb8b8ead2988ad44edc865", "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc"],
            optionalDVNThreshold: 1,
          },
        },
      },
    },
    // Mainnet to Polygon
    {
      from: mainnetContract,
      to: polygonContract,
      config: {
        receiveLibraryConfig: { receiveLibrary: "0xc02Ab410f0734EFa3F14628780e6e695156024C2", gracePeriod: 0n },
        receiveConfig: {
          ulnConfig: {
            confirmations: BigInt(512),
            requiredDVNs: ["0x589dedbd617e0cbcb916a9223f4d1300c294236b", "0xa59ba433ac34d2927232918ef5b2eaafcf130ba5"],
            optionalDVNs: ["0xc9ca319f6da263910fd9b037ec3d817a814ef3d8", "0xd56e4eab23cb81f43168f9f45211eb027b9ac7cc"],
            optionalDVNThreshold: 1,
          },
        },
      },
    },
  ],
};

export default config;
