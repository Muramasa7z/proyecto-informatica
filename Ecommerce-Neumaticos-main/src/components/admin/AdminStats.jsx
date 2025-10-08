// src/components/admin/AdminStats.jsx
import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminStats = ({ orders, products }) => {
  // Calcular estadísticas
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
    pendingOrders: orders.filter(order => order.estado === 'pendiente').length,
    completedOrders: orders.filter(order => order.estado === 'entregado').length,
    totalProducts: products.length,
    lowStockProducts: products.filter(product => product.stock < 10).length,
    outOfStockProducts: products.filter(product => product.stock === 0).length,
  };

  // Datos para gráfico de estados de pedidos
  const ordersStatusData = {
    labels: ['Pendientes', 'Confirmados', 'Enviados', 'Entregados', 'Cancelados'],
    datasets: [
      {
        data: [
          orders.filter(o => o.estado === 'pendiente').length,
          orders.filter(o => o.estado === 'confirmado').length,
          orders.filter(o => o.estado === 'enviado').length,
          orders.filter(o => o.estado === 'entregado').length,
          orders.filter(o => o.estado === 'cancelado').length,
        ],
        backgroundColor: [
          '#FBBF24', // Amarillo - Pendientes
          '#3B82F6', // Azul - Confirmados
          '#8B5CF6', // Violeta - Enviados
          '#10B981', // Verde - Entregados
          '#EF4444', // Rojo - Cancelados
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF',
      },
    ],
  };

  // Datos para gráfico de ventas mensuales
  const getMonthlySalesData = () => {
    const monthlySales = Array(12).fill(0);
    
    orders.forEach(order => {
      if (order.fecha) {
        const month = new Date(order.fecha).getMonth();
        monthlySales[month] += order.total || 0;
      }
    });

    return {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [
        {
          label: 'Ventas ($)',
          data: monthlySales,
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    };
  };

  // Datos para gráfico de productos más vendidos
  const getTopProductsData = () => {
    const productSales = {};
    
    orders.forEach(order => {
      if (order.items) {
        order.items.forEach(item => {
          productSales[item.nombre] = (productSales[item.nombre] || 0) + item.cantidad;
        });
      }
    });

    const sortedProducts = Object.entries(productSales)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    return {
      labels: sortedProducts.map(([name]) => name),
      datasets: [
        {
          label: 'Unidades Vendidas',
          data: sortedProducts.map(([,count]) => count),
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 2,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-900">Total Ventas</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            ${stats.totalRevenue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mt-1">{stats.totalOrders} pedidos</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-900">Pedidos Entregados</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.completedOrders}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {((stats.completedOrders / stats.totalOrders) * 100 || 0).toFixed(1)}% completados
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold text-gray-900">Pedidos Pendientes</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.pendingOrders}
          </p>
          <p className="text-sm text-gray-600 mt-1">Necesitan atención</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-gray-900">Inventario</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {stats.totalProducts}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {stats.lowStockProducts} con stock bajo
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico de Estados de Pedidos */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Estados de Pedidos
          </h3>
          <div className="h-80">
            <Doughnut 
              data={ordersStatusData} 
              options={chartOptions}
            />
          </div>
        </div>

        {/* Gráfico de Ventas Mensuales */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ventas Mensuales
          </h3>
          <div className="h-80">
            <Line 
              data={getMonthlySalesData()} 
              options={chartOptions}
            />
          </div>
        </div>

        {/* Productos Más Vendidos */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Productos Más Vendidos
          </h3>
          <div className="h-80">
            <Bar 
              data={getTopProductsData()} 
              options={{
                ...chartOptions,
                indexAxis: 'y',
              }}
            />
          </div>
        </div>
      </div>

      {/* Alertas Importantes */}
      {(stats.pendingOrders > 0 || stats.lowStockProducts > 0) && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Alertas Importantes
          </h3>
          <div className="space-y-3">
            {stats.pendingOrders > 0 && (
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="font-medium text-yellow-800">
                    {stats.pendingOrders} pedidos pendientes de procesar
                  </span>
                </div>
                <a 
                  href="#orders" 
                  className="text-yellow-600 hover:text-yellow-800 font-medium text-sm"
                >
                  Revisar →
                </a>
              </div>
            )}
            {stats.lowStockProducts > 0 && (
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="font-medium text-red-800">
                    {stats.lowStockProducts} productos con stock bajo
                  </span>
                </div>
                <a 
                  href="#products" 
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Revisar →
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStats;