import 'dotenv/config';
import { Worker, NativeConnection } from '@temporalio/worker';
import * as activities from '../activities';

const TEMPORAL_ADDRESS = process.env.TEMPORAL_ADDRESS || 'localhost:7233';

async function connectWithRetry() {
  console.log(TEMPORAL_ADDRESS);
  for (let attempt = 1; attempt <= 30; attempt++) {
    try {
      const connection = await NativeConnection.connect({
        address: TEMPORAL_ADDRESS,
      });

      console.log(`✅ Connected to Temporal at ${TEMPORAL_ADDRESS}`);
      return connection;
    } catch (err) {
      console.log(
        `⏳ Temporal not ready (attempt ${attempt}/30). Retrying in 2s...`
      );
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  throw new Error('❌ Temporal server not reachable after retries');
}

async function run() {
  console.log('🔄 Starting Upload Worker...');

  const connection = await connectWithRetry();

  const worker = await Worker.create({
    connection,
    namespace: 'default',
    workflowsPath: require.resolve('../workflows'),
    activities,
    taskQueue: 'upload-queue',
  });

  console.log('✅ Upload Worker running on task queue: upload-queue');
  await worker.run();
}

run().catch((err) => {
  console.error('❌ Worker failed:', err);
  process.exit(1);
});
