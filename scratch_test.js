require('dotenv').config({ path: '.env.local' });

async function test() {
    // We don't have accessToken here, so it might fail
    console.log('Testing...');
}
test();
