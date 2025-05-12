import React, { useState } from 'react';
import axios from 'axios';

const RedisTestPage = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testRedisConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/test/redis-test');
      setTestResult(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error testing Redis connection:', error);
      setError(error.response?.data?.message || 'Failed to test Redis connection');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-5 sm:px-0 bg-gradient-to-br from-slate-900 to-zinc-900">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg shadow-lg overflow-hidden max-w-md w-full p-8">
        <h2 className="text-2xl text-gray-200 text-center mb-6 font-poppins">Redis Connection Test</h2>
        
        <button 
          onClick={testRedisConnection}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-500 transition-colors duration-200 mb-6"
        >
          {loading ? 'Testing...' : 'Test Redis Connection'}
        </button>
        
        {error && (
          <div className="p-4 bg-red-400 bg-opacity-20 border border-red-500 rounded-lg mb-4">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        
        {testResult && (
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${testResult.success ? 'bg-green-500' : 'bg-red-500'}`}>
                {testResult.success ? 'Success' : 'Failed'}
              </span>
            </div>
            
            <p className="text-gray-300 mb-2">{testResult.message}</p>
            
            {testResult.data && (
              <div className="mt-4 p-3 bg-gray-800 rounded overflow-x-auto">
                <pre className="text-gray-300 text-sm whitespace-pre-wrap">
                  <strong>Test Key:</strong> {testResult.data.key}
                  <br />
                  <strong>Set Value:</strong> {testResult.data.setValue}
                  <br />
                  <strong>Retrieved Value:</strong> {testResult.data.retrievedValue}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RedisTestPage;
