export const perfLogger = {
  async requestDidStart(requestContext) {
    console.log('[DEBUG]: Request started!');
    let prevTime: number;
    const t0 = performance.now();

    return {
      async parsingDidStart(requestContext) {
        const t1 = performance.now();
        console.log('[DEBUG]: Parsing started!', t1 - t0);
        prevTime = t1;
      },

      async validationDidStart(requestContext) {
        const t2 = performance.now();
        console.log('[DEBUG]: Validation started!', t2 - prevTime);
        prevTime = t2;
      },

      async willSendResponse(requestContext) {
        const t3 = performance.now();
        console.log('[DEBUG]: Sending response started! ', t3 - prevTime);
        prevTime = t3;
      },
    };
  },
};
