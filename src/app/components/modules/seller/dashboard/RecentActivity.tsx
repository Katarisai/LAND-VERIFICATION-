import React from 'react';
import { MapPin, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../ui/card";
import { Avatar, AvatarFallback } from "../../../ui/avatar";
import { Badge } from "../../../ui/badge";
import { ScrollArea } from "../../../ui/scroll-area";

const activities = [
  { id: 1, title: "Sunset Valley Plot 1", location: "Visakhapatnam, AP", amount: "$45,000", status: "Verified", date: "Today, 10:23 AM", type: "property" },
  { id: 2, title: "Document Upload: Deed", location: "Green Acres, Plot 4", amount: "-", status: "Pending", date: "Yesterday, 4:00 PM", type: "document" },
  { id: 3, title: "Hillside View Plot 7", location: "Rushikonda, AP", amount: "$120,000", status: "Action Required", date: "Jan 5, 2026", type: "alert" },
  { id: 4, title: "Sunset Valley Plot 2", location: "Visakhapatnam, AP", amount: "$45,000", status: "Verified", date: "Jan 4, 2026", type: "property" },
  { id: 5, title: "Lakeview Estate", location: "Bheemili, AP", amount: "$85,000", status: "Verified", date: "Jan 2, 2026", type: "property" },
];

export function RecentActivity() {
  const getStatusColor = (status: string) => {
    if (status === "Verified") return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 border-green-200 dark:border-green-500/30";
    if (status === "Pending") return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300 border-amber-200 dark:border-amber-500/30";
    return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-500/30";
  };

  const renderIcon = (type: string) => {
    if (type === "property") return <MapPin className="h-4 w-4 text-blue-500 dark:text-blue-400" />;
    if (type === "document") return <FileText className="h-4 w-4 text-purple-500 dark:text-purple-400" />;
    return <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-400" />;
  };

  return (
    // GLASS CONTAINER STYLE - Adaptive
    <Card className="col-span-4 h-full bg-white/60 dark:bg-slate-900/50 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-slate-800 dark:text-white">Recent Activity</CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400">Real-time updates on your portfolio.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4"> 
          <div className="space-y-4">
            {activities.map((item) => (
              <div key={item.id} className="flex items-center justify-between group cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 p-3 rounded-xl transition-colors">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800">
                    <AvatarFallback className="bg-transparent">{renderIcon(item.type)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.location} • {item.date}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="font-medium text-sm text-slate-900 dark:text-slate-200">{item.amount}</div>
                  <Badge variant="outline" className={`text-[10px] px-2 py-0.5 border ${getStatusColor(item.status)}`}>
                    {item.status === 'Verified' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}