import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Ocak', Satış: 4000, Gelir: 2400 },
  { name: 'Şubat', Satış: 3000, Gelir: 1398 },
  { name: 'Mart', Satış: 2000, Gelir: 9800 },
  { name: 'Nisan', Satış: 2780, Gelir: 3908 },
  { name: 'Mayıs', Satış: 1890, Gelir: 4800 },
  { name: 'Haziran', Satış: 2390, Gelir: 3800 },
  { name: 'Temmuz', Satış: 3490, Gelir: 4300 },
];

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aylık Satış ve Gelir</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Satış" fill="#8884d8" name="Toplam Satış Adedi" />
              <Bar dataKey="Gelir" fill="#82ca9d" name="Toplam Gelir (₺)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}