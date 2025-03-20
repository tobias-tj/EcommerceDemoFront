import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";
import FormCreateProduct from "@/components/admin/FormCreateProduct";
import { SalesInformation } from "@/types/SalesInformation";
import { useEffect, useState } from "react";
import { getAllInformationSales } from "@/api/admin/GetInformationSales";

// Colors for charts
const COLORS = ["#1A1A1A", "#333333", "#4D4D4D", "#666666", "#808080"];

const AdminDashboard = () => {
  const [salesData, setSalesData] = useState<SalesInformation | null>();

  const [, setIsLoading] = useState<boolean>(true);

  const fetchSales = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token") || "NULL";

    try {
      const sales = await getAllInformationSales(token);
      setSalesData(sales);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [salesData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-white border rounded shadow-md">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 min-w-5xl">
      {/* Sección de métricas */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="flex items-center p-4">
          <div className="p-3 bg-gray-100 rounded-full">
            <DollarSign className="w-6 h-6 text-zinc-600" />
          </div>
          <CardContent className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Total de Ingresos</p>
            <p className="text-xl font-bold">{salesData?.totalIncoming}</p>
          </CardContent>
        </Card>
        <Card className="flex items-center p-4">
          <div className="p-3 bg-gray-100 rounded-full">
            <ShoppingCart className="w-6 h-6 text-zinc-600" />
          </div>
          <CardContent className="flex flex-col items-center ">
            <p className="text-sm text-muted-foreground">Ventas Totales</p>
            <p className="text-xl font-bold">{salesData?.saleTotal}</p>
          </CardContent>
        </Card>
        <Card className="flex items-center p-4">
          <div className="p-3 bg-gray-100 rounded-full">
            <Package className="w-6 h-6 text-zinc-600" />
          </div>
          <CardContent className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground">Productos</p>
            <p className="text-xl font-bold">{salesData?.countProducts}</p>
          </CardContent>
        </Card>
        <Card className="flex items-center p-4">
          <div className="p-3 bg-gray-100 rounded-full">
            <Users className="w-6 h-6 text-zinc-600" />
          </div>
          <CardContent className="flex flex-col items-center ">
            <p className="text-sm text-muted-foreground">Clientes</p>
            <p className="text-xl font-bold">{salesData?.countClients}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para diferentes gráficos */}
      <Tabs defaultValue="ventas" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="ventas">Ventas</TabsTrigger>
          <TabsTrigger value="productos">Productos</TabsTrigger>
          <TabsTrigger value="categorias">Categorías</TabsTrigger>
        </TabsList>

        {/* Tab de Ventas */}
        <TabsContent value="ventas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ventas Mensuales vs Objetivo</CardTitle>
              <CardDescription>
                Comparación de ventas reales contra objetivos mensuales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={salesData?.saleList}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="ventas" fill="#1A1A1A" name="Ventas" />
                  <Bar dataKey="objetivo" fill="#808080" name="Objetivo" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tendencia de Ventas</CardTitle>
              <CardDescription>
                Evolución de ventas en los últimos meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={salesData?.saleList}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ventas"
                    stroke="#1A1A1A"
                    activeDot={{ r: 8 }}
                    name="Ventas"
                  />
                  <Line
                    type="monotone"
                    dataKey="objetivo"
                    stroke="#808080"
                    strokeDasharray="5 5"
                    name="Objetivo"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Productos */}
        <TabsContent value="productos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top 5 Productos Más Vendidos</CardTitle>
              <CardDescription>
                Productos con mayor número de ventas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={salesData?.topProductsList}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar dataKey="ventas" fill="#8884d8" name="Unidades Vendidas">
                    {salesData?.topProductsList.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Categorías */}
        <TabsContent value="categorias">
          <Card>
            <CardHeader>
              <CardTitle>Distribución de Ventas por Marcas</CardTitle>
              <CardDescription>
                Porcentaje de ventas por marcas de productos
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <Pie
                    data={salesData?.brandList}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {salesData?.brandList.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Formulario para agregar productos */}
      <FormCreateProduct />
    </div>
  );
};

export default AdminDashboard;
