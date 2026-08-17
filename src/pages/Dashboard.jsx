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
