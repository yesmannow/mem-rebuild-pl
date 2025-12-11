import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Trash2, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Role {
  id: string;
  title: string;
  salary: number;
  count: number;
  function: string;
}

const HeadcountModeler: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([
    { id: '1', title: 'Marketing Manager', salary: 95000, count: 1, function: 'Management' },
    { id: '2', title: 'Content Strategist', salary: 75000, count: 2, function: 'Content' },
    { id: '3', title: 'Paid Media Specialist', salary: 70000, count: 1, function: 'Paid Media' },
    { id: '4', title: 'SEO Specialist', salary: 72000, count: 1, function: 'SEO' },
  ]);
  const [newRoleTitle, setNewRoleTitle] = useState('');
  const [newRoleSalary, setNewRoleSalary] = useState(70000);
  const [newRoleFunction, setNewRoleFunction] = useState('Content');
  const [overheadRate, setOverheadRate] = useState(1.4); // 40% overhead

  const functionOptions = ['Management', 'Content', 'Paid Media', 'SEO', 'Events', 'Design', 'Analytics'];
  const functionColors: Record<string, string> = {
    'Management': '#40E0D0',
    'Content': '#FFA500',
    'Paid Media': '#88ABF2',
    'SEO': '#10B981',
    'Events': '#EC4899',
    'Design': '#B0C4DE',
    'Analytics': '#F59E0B',
  };

  const addRole = () => {
    if (newRoleTitle.trim()) {
      setRoles([
        ...roles,
        {
          id: Date.now().toString(),
          title: newRoleTitle,
          salary: newRoleSalary,
          count: 1,
          function: newRoleFunction,
        },
      ]);
      setNewRoleTitle('');
      setNewRoleSalary(70000);
    }
  };

  const removeRole = (id: string) => {
    setRoles(roles.filter((r) => r.id !== id));
  };

  const updateRoleCount = (id: string, count: number) => {
    setRoles(roles.map((r) => (r.id === id ? { ...r, count: Math.max(0, count) } : r)));
  };

  const { totalSalary, totalFullyLoaded, totalHeadcount, functionBreakdown } = useMemo(() => {
    const total = roles.reduce((sum, role) => sum + role.salary * role.count, 0);
    const fullyLoaded = total * overheadRate;
    const headcount = roles.reduce((sum, role) => sum + role.count, 0);

    const breakdown = roles.reduce((acc, role) => {
      if (!acc[role.function]) {
        acc[role.function] = { cost: 0, count: 0, color: functionColors[role.function] || '#888' };
      }
      acc[role.function].cost += role.salary * role.count * overheadRate;
      acc[role.function].count += role.count;
      return acc;
    }, {} as Record<string, { cost: number; count: number; color: string }>);

    return {
      totalSalary: total,
      totalFullyLoaded: fullyLoaded,
      totalHeadcount: headcount,
      functionBreakdown: breakdown,
    };
  }, [roles, overheadRate]);

  const chartData = Object.entries(functionBreakdown).map(([name, data]) => ({
    name,
    cost: Math.round(data.cost),
    count: data.count,
    color: data.color,
  }));

  return (
    <div className="rounded-2xl border border-brand-teal/20 bg-slate-900/50 backdrop-blur-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-teal/20 border border-brand-teal/30 text-brand-teal">
          <Users size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-muted">Team Planning</p>
          <h3 className="text-2xl font-semibold text-brand-text">Headcount Modeler</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls & Team List */}
        <div className="space-y-4">
          {/* Add Role */}
          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-brand-text mb-3">Add Team Member</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Role Title"
                value={newRoleTitle}
                onChange={(e) => setNewRoleTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Salary"
                  value={newRoleSalary}
                  onChange={(e) => setNewRoleSalary(Number(e.target.value))}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                />
                <select
                  value={newRoleFunction}
                  onChange={(e) => setNewRoleFunction(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-800/60 border border-brand-teal/30 text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
                >
                  {functionOptions.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={addRole}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-brand-teal text-brand-dark font-semibold hover:bg-brand-teal/90 transition-colors"
              >
                <Plus size={16} />
                Add Role
              </button>
            </div>
          </div>

          {/* Overhead Rate */}
          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/50">
            <label className="text-sm text-brand-muted mb-2 block">
              Fully-Loaded Cost Multiplier: {overheadRate.toFixed(2)}x
            </label>
            <input
              type="range"
              value={overheadRate}
              onChange={(e) => setOverheadRate(Number(e.target.value))}
              min="1.0"
              max="2.0"
              step="0.05"
              className="w-full"
            />
            <p className="text-xs text-brand-muted mt-1">
              Includes benefits, overhead, and taxes
            </p>
          </div>

          {/* Team List */}
          <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-700/50 max-h-96 overflow-y-auto">
            <h4 className="text-sm font-semibold text-brand-text mb-3">Current Team</h4>
            <div className="space-y-2">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/50 border border-slate-700/30"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: functionColors[role.function] }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-brand-text truncate">{role.title}</div>
                    <div className="text-xs text-brand-muted">
                      ${role.salary.toLocaleString()} • {role.function}
                    </div>
                  </div>
                  <input
                    type="number"
                    value={role.count}
                    onChange={(e) => updateRoleCount(role.id, Number(e.target.value))}
                    min="0"
                    className="w-16 px-2 py-1 rounded bg-slate-800/60 border border-brand-teal/30 text-brand-text text-sm text-center focus:outline-none focus:ring-1 focus:ring-brand-teal/50"
                  />
                  <button
                    onClick={() => removeRole(role.id)}
                    className="p-1 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                    aria-label="Remove role"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {roles.length === 0 && (
                <p className="text-sm text-brand-muted text-center py-4">
                  No team members added yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Summary & Chart */}
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-brand-teal/10 to-transparent rounded-lg p-4 border border-brand-teal/30">
              <div className="text-xs uppercase tracking-wider text-brand-muted mb-1">
                Total Headcount
              </div>
              <div className="text-3xl font-bold text-brand-text">{totalHeadcount}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-lg p-4 border border-blue-500/30">
              <div className="text-xs uppercase tracking-wider text-brand-muted mb-1">
                Base Salary Cost
              </div>
              <div className="text-2xl font-bold text-brand-text">
                ${(totalSalary / 1000).toFixed(0)}K
              </div>
            </div>
            <div className="col-span-2 bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg p-4 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign size={16} className="text-purple-400" />
                <span className="text-xs uppercase tracking-wider text-brand-muted">
                  Fully-Loaded Annual Cost
                </span>
              </div>
              <div className="text-3xl font-bold text-brand-text">
                ${(totalFullyLoaded / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-brand-muted mt-1">
                ${(totalFullyLoaded / 12 / 1000).toFixed(1)}K per month
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-slate-800/20 rounded-lg p-4 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-brand-text mb-4">Cost by Function</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(64, 224, 208, 0.3)',
                    borderRadius: '8px',
                    color: '#E2E8F0',
                  }}
                />
                <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadcountModeler;
