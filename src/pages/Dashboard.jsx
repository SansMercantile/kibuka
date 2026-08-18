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

  const renderOverviewTab = () => (
    <div className="space-y-8">
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
          <div className="text-2xl font-bold text-pink-400 mb-2">24/7</div>
          <div className="text-gray-300 text-sm">Global Coverage</div>
        </div>
      </div>

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

  const renderTrackingTab = () => (
    <div className="aerospace-card p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Satellite className="w-6 h-6 mr-2 text-purple-400" />
        Tracked Object Catalog
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="py-2 pr-4">Object</th>
              <th className="py-2 pr-4">Orbit</th>
              <th className="py-2 pr-4">Altitude</th>
              <th className="py-2 pr-4">Velocity</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-200">
            {[
              ['Constellation Satellite Alpha-7', 'LEO', '487 km', '7.6 km/s', 'NOMINAL', 'green'],
              ['Commercial Satellite Network', 'GEO', '35,786 km', '3.1 km/s', 'MONITORING', 'blue'],
              ['Debris Fragment KX-2291', 'LEO', '512 km', '7.5 km/s', 'TRACKING', 'yellow'],
              ['Weather Satellite Meridian-3', 'SSO', '705 km', '7.5 km/s', 'NOMINAL', 'green'],
              ['ISS', 'LEO', '408 km', '7.66 km/s', 'NOMINAL', 'green'],
            ].map(([name, orbit, alt, vel, status, color]) => (
              <tr key={name} className="border-b border-gray-800/60">
                <td className="py-3 pr-4 font-medium text-white">{name}</td>
                <td className="py-3 pr-4">{orbit}</td>
                <td className="py-3 pr-4">{alt}</td>
                <td className="py-3 pr-4">{vel}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-xs bg-${color}-500/20 text-${color}-400`}>{status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMonitoringTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="aerospace-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Radar className="w-5 h-5 mr-2 text-cyan-400" /> Sensor Network
        </h3>
        <div className="space-y-3">
          {[
            ['Ground Radar Station Alpha', 'ONLINE', 'green'],
            ['Ground Radar Station Beta', 'ONLINE', 'green'],
            ['Optical Telescope Array North', 'ONLINE', 'green'],
            ['Optical Telescope Array South', 'DEGRADED', 'yellow'],
            ['Space-Based Sensor Cluster', 'ONLINE', 'green'],
          ].map(([name, status, color]) => (
            <div key={name} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-white text-sm">{name}</span>
              <span className={`px-2 py-1 bg-${color}-500/20 text-${color}-400 rounded text-xs`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="aerospace-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Space Weather</h3>
        <div className="space-y-4">
          <div className="flex justify-between"><span className="text-gray-400">Solar Wind Speed</span><span className="text-white">412 km/s</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Geomagnetic Index (Kp)</span><span className="text-white">2 (Quiet)</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Solar Flare Risk</span><span className="text-green-400">Low</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Radiation Belt Activity</span><span className="text-white">Nominal</span></div>
        </div>
      </div>
    </div>
  );

  const renderThreatsTab = () => (
    <div className="aerospace-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-red-400" /> Threat Assessment Feed
      </h3>
      <div className="space-y-3">
        {[
          ['Conjunction Risk: KX-2291 / Alpha-7', 'Predicted close approach in 14h, probability 1:8,400', 'MEDIUM', 'yellow'],
          ['Unregistered RF Emission', 'Unidentified signal near GEO belt, monitoring source', 'LOW', 'blue'],
          ['No active ASAT indicators', 'All monitored launch sites nominal', 'NONE', 'green'],
        ].map(([title, desc, level, color]) => (
          <div key={title} className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg">
            <div>
              <div className="text-white font-medium">{title}</div>
              <div className="text-gray-400 text-sm mt-1">{desc}</div>
            </div>
            <span className={`px-2 py-1 bg-${color}-500/20 text-${color}-400 rounded text-xs shrink-0 ml-4`}>{level}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAwarenessTab = () => (
    <div className="aerospace-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Eye className="w-5 h-5 mr-2 text-pink-400" /> Space Domain Awareness Summary
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
          <div className="text-2xl font-bold text-white">1,247</div>
          <div className="text-gray-400 text-sm">Objects &gt; 10cm tracked</div>
        </div>
        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
          <div className="text-2xl font-bold text-white">89</div>
          <div className="text-gray-400 text-sm">Active assets monitored</div>
        </div>
        <div className="text-center p-4 bg-gray-800/50 rounded-lg">
          <div className="text-2xl font-bold text-white">3</div>
          <div className="text-gray-400 text-sm">Conjunction watches open</div>
        </div>
      </div>
      <p className="text-gray-300 text-sm">
        Current space domain posture is nominal across all monitored orbital regimes.
        No unresolved conjunction alerts above medium risk, and all allied assets report
        expected telemetry.
      </p>
    </div>
  );

  const renderSystemTab = () => (
    <div className="aerospace-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Settings className="w-5 h-5 mr-2 text-gray-400" /> System Status
      </h3>
      <div className="space-y-3">
        {[
          ['Tracking Engine', 'OPERATIONAL', 'green'],
          ['Sensor Fusion Pipeline', 'OPERATIONAL', 'green'],
          ['Conjunction Analysis', 'OPERATIONAL', 'green'],
          ['Data Ingest Latency', '1.2s avg', 'blue'],
          ['Last Full Catalog Sync', '6 minutes ago', 'blue'],
        ].map(([name, status, color]) => (
          <div key={name} className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
            <span className="text-white text-sm">{name}</span>
            <span className={`px-2 py-1 bg-${color}-500/20 text-${color}-400 rounded text-xs`}>{status}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverviewTab();
      case 'tracking': return renderTrackingTab();
      case 'monitoring': return renderMonitoringTab();
      case 'threats': return renderThreatsTab();
      case 'awareness': return renderAwarenessTab();
      case 'system': return renderSystemTab();
      default: return renderOverviewTab();
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

