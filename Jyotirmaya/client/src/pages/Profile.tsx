import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Bell, Globe, Eye, Download, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Profile() {
  const [, setLocation] = useLocation();
  const [notifications, setNotifications] = useState(true);
  const [dataSharing, setDataSharing] = useState(true);
  const [language, setLanguage] = useState('english');
  const [highContrast, setHighContrast] = useState(false);
  
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const results = JSON.parse(localStorage.getItem('scan_results') || '[]');

  const handleLogout = () => {
    localStorage.removeItem('user_onboarded');
    setLocation('/');
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
      localStorage.clear();
      setLocation('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-500 text-white p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/home')}
            className="text-white hover:bg-blue-600"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">Profile & Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <CardTitle>Welcome User</CardTitle>
                <CardDescription>jyotirmaya Member</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="text-base">
                    Appointment Reminders
                  </Label>
                  <Switch
                    id="notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Language & Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-base">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                      <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="contrast" className="text-base">
                    High Contrast Mode
                  </Label>
                  <Switch
                    id="contrast"
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label htmlFor="sharing" className="text-base">
                      Share Data with Galaxy Hospital
                    </Label>
                    <p className="text-sm text-gray-500 mt-1">
                      For appointment booking and lead generation
                    </p>
                  </div>
                  <Switch
                    id="sharing"
                    checked={dataSharing}
                    onCheckedChange={setDataSharing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Appointment History</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  <div className="space-y-3">
                    {bookings.map((booking: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">{booking.specialty}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{booking.hospital}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No appointments yet</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scan History</CardTitle>
              </CardHeader>
              <CardContent>
                {results.length > 0 ? (
                  <div className="space-y-3">
                    {results.slice(0, 5).map((result: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">{result.condition} - {result.eye} Eye</p>
                        <p className="text-sm text-gray-500">
                          Severity: {result.severity} ({result.confidence}% confidence)
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(result.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No scan results yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Management</CardTitle>
                <CardDescription>
                  Export or delete your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full h-12"
                  onClick={() => alert('Export feature coming soon!')}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Export All Data
                </Button>
                <Button
                  variant="destructive"
                  className="w-full h-12"
                  onClick={clearAllData}
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Delete All Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button
          variant="outline"
          className="w-full h-12"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
