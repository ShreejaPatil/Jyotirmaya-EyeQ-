import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Download, Calendar, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Results() {
  const [, setLocation] = useLocation();
  const results = JSON.parse(localStorage.getItem('scan_results') || '[]');
  const latestResult = results[0];

  if (!latestResult) {
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
            <h1 className="text-xl font-bold">Scan Results</h1>
          </div>
        </div>
        <div className="p-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Info className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No scan results available yet.</p>
              <Button
                onClick={() => setLocation('/capture')}
                className="mt-4 bg-blue-500 hover:bg-blue-600"
              >
                Take Your First Scan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'severe': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityValue = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild': return 33;
      case 'moderate': return 66;
      case 'severe': return 100;
      default: return 0;
    }
  };

  const getEducationalTip = (condition: string) => {
    if (condition.toLowerCase() === 'cataract') {
      return 'Protect eyes from UV light with sunglasses. Regular eye checkups are essential.';
    } else if (condition.toLowerCase() === 'allergy') {
      return 'Avoid rubbing eyes. Use cool compress and antihistamine drops as prescribed.';
    }
    return 'Maintain good eye hygiene and schedule regular checkups.';
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
          <h1 className="text-xl font-bold">Scan Results</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-900">AI Analysis Result</AlertTitle>
          <AlertDescription className="text-blue-800">
            This is a preliminary assessment. Please consult an ophthalmologist for diagnosis.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Latest Analysis</span>
              {latestResult.severity.toLowerCase() === 'severe' && (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              )}
              {latestResult.severity.toLowerCase() === 'mild' && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
            </CardTitle>
            <CardDescription>
              {new Date(latestResult.timestamp).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Condition</p>
                  <p className="text-lg font-semibold">{latestResult.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Eye</p>
                  <p className="text-lg font-semibold">{latestResult.eye}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Severity</p>
                  <p className="text-lg font-semibold">{latestResult.severity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Confidence</p>
                  <p className="text-lg font-semibold">{latestResult.confidence}%</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Severity Level</p>
              <div className="relative">
                <Progress value={getSeverityValue(latestResult.severity)} className="h-3" />
                <div className={`absolute top-0 left-0 h-3 ${getSeverityColor(latestResult.severity)} rounded-full transition-all`} 
                     style={{ width: `${getSeverityValue(latestResult.severity)}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Health Tip:</strong> {getEducationalTip(latestResult.condition)}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => {
              alert('Report download feature coming soon!');
            }}
            variant="outline"
            className="h-12"
          >
            <Download className="h-5 w-5 mr-2" />
            Download PDF
          </Button>
          <Button
            onClick={() => setLocation('/booking')}
            className="h-12 bg-green-500 hover:bg-green-600"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Book Appointment
          </Button>
        </div>

        {results.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Previous Scans</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {results.slice(1, 4).map((result: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{result.condition} - {result.eye} Eye</p>
                    <p className="text-sm text-gray-500">
                      {new Date(result.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getSeverityColor(result.severity)}`}>
                    {result.severity}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
