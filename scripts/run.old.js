const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  let data = [];
  const sendWave = (address) => {
    if (data.find((item) => item.address === address)) {
      data.forEach((element) => {
        if (element.address === address) {
          element.totalWaves++;
        }
      });
    } else {
      data.push({
        address,
        totalWaves: 1,
      });
    }
  };

  sendWave(owner.address);
  sendWave(owner.address);
  sendWave(randomPerson.address);
  sendWave(randomPerson.address);
  sendWave(randomPerson.address);
  sendWave(randomPerson.address);
  sendWave(randomPerson.address);
  sendWave(randomPerson.address);

  const largestWaver = data.reduce((prev, curr) =>
    prev.totalWaves > curr.totalWaves ? prev : curr
  );
  console.log(
    `Address of the largest total waver ${largestWaver.address} and their total waves ${largestWaver.totalWaves}`
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
