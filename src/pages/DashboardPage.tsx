import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Título */}
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Cards de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">120</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Gs. 12.000.000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visitas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3.200</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Soporte</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8 tickets</p>
          </CardContent>
        </Card>
      </div>

      {/* Buscador */}
      <div className="flex items-center gap-4">
        <Input placeholder="Buscar usuario..." className="max-w-sm" />
        <Button>Buscar</Button>
      </div>

      {/* Tabla de ejemplo */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Juan Pérez</TableCell>
              <TableCell>juanperez@email.com</TableCell>
              <TableCell>Administrador</TableCell>
              <TableCell>Activo</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Maria Lopez</TableCell>
              <TableCell>marialopez@email.com</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Inactivo</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Carlos Gómez</TableCell>
              <TableCell>carlosgomez@email.com</TableCell>
              <TableCell>Soporte</TableCell>
              <TableCell>Activo</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
