import React, { useState } from 'react';
import axios from 'axios';
import { Satellite, Radar, Shield, Activity, Settings, Eye, RefreshCw } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState('');

  const handleRefresh = async () => {
    setRefreshing(true);
    setRefreshStatus('Checking API health...');
    try {
      const response = await axios.get(`${API_BASE_URL}/api/health`);
      setRefreshStatus(`API status: ${response.status} ${response.statusText}`);
    } catch (error) {
      setRefreshStatus(`API health check failed: ${error.message}`);
    } finally {
      setRefreshing(false);
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'tracking', name: 'Tracking', icon: Satellite },
    { id: 'monitoring', name: 'Monitoring', icon: Radar },
    { id: 'threats', name: 'Threats', icon: Shield },
    { id: 'awareness', name: 'Awareness', icon: Eye },
    { id: 'system', name: 'System', icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Aerospace Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="aerospace-card text-center p-6">
                <div className="text-2xl font-bold text-purple-400 mb-2">SECURE</div>
                <div className="text-gray-300 text-sm">Space Domain</div>
              </div>
              <div className="aerospace-card text-center p-6">
                <div className="text-2xl font-bold text-white mb-2">1,247</div>
                <div className="text-gray-300 text-sm">Tracked Objects</div>
              </div>
              <div className="aerospace-card text-center p-6">
                <div className="text-2xl font-bold text-cyan-400 mb-2">99.8%</div>
                <div className="text-gray-300 text-sm">Tracking Accuracy</div>
              </div>
              <div className="aerospace-card text-center p-6">
                <div className="text-2xl font-bold text-magenta-400 mb-2">24/7</div>
                <div className="text-gray-300 text-sm">Global Coverage</div>
              </div>
            </div>

            {/* Active Tracking */}
            <div className="aerospace-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Satellite className="w-6 h-6 mr-2 text-purple-400" />
                Active Orbital Tracking
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Constellation Satellite Alpha-7</div>
                    <div className="text-gray-400 text-sm">Low Earth Orbit - Altitude: 487km</div>
                  </div>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">NOMINAL</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Commercial Satellite Network</div>
                    <div className="text-gray-400 text-sm">Geostationary Orbit - 8 satellites</div>
                  </div>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">MONITORING</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="aerospace-card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h3>
            <p className="text-gray-300">Aerospace situational awareness functionality for {activeTab}.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg mr-4">
              <Satellite className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">KIBUKA</h1>
              <p className="text-purple-200">Aerospace Situational Awareness</p>
            </div>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Advanced aerospace situational awareness with orbital tracking and space domain monitoring
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full hover:bg-purple-500/30 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Data'}
            </button>
            {refreshStatus && (
              <div className="text-xs text-gray-400">{refreshStatus}</div>
            )}
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 mx-1 mb-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;