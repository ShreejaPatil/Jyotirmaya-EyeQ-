import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Camera, FileText, Calendar, User, Award, Eye } from 'lucide-react';
import { api, getCurrentUser, type ScanResult } from '@/lib/api';

export default function Home() {
  const [, setLocation] = useLocation();
  const [scanCount, setScanCount] = useState(0);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      api.scanResults.getAll(currentUser.id).then((results) => {
        setScanCount(results.length);
      });
    }
  }, [currentUser]);

  const progress = Math.min((scanCount / 10) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-500 text-white p-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold" data-testid="app-title">jyotirmaya</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation('/profile')}
            className="text-white hover:bg-blue-600"
            data-testid="profile-button"
          >
            <User className="h-6 w-6" />
          </Button>
        </div>
        <p className="text-blue-100">Your eye health companion</p>
      </div>

      <div className="p-4 space-y-4 -mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              Eye Health Progress
            </CardTitle>
            <CardDescription>
              Complete 10 scans to earn "Eye Health Star" badge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span data-testid="scan-progress">{scanCount} / 10 scans</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setLocation('/capture')}
            data-testid="scan-eye-card"
          >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="font-semibold text-base">Scan Eye</h3>
              <p className="text-xs text-gray-500">Take a photo for AI analysis</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setLocation('/results')}
            data-testid="view-reports-card"
          >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-base">View Reports</h3>
              <p className="text-xs text-gray-500">See your scan history</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setLocation('/booking')}
            data-testid="book-appointment-card"
          >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-base">Book Appointment</h3>
              <p className="text-xs text-gray-500">Schedule with Galaxy Hospital</p>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setLocation('/profile')}
            data-testid="profile-card"
          >
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="font-semibold text-base">Profile</h3>
              <p className="text-xs text-gray-500">Settings and preferences</p>
            </CardContent>
          </Card>
        </div>

        {scanCount === 0 && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Eye className="h-6 w-6 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Start Your First Scan!</h4>
                  <p className="text-sm text-blue-700">
                    Tap "Scan Eye" to begin your eye health journey. Our AI will help detect potential issues early.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
