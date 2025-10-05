import { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Capture() {
  const [, setLocation] = useLocation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFeedback('Image loaded successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!imagePreview) {
      setFeedback('Please capture or upload an image first');
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      const scanCount = parseInt(localStorage.getItem('scan_count') || '0');
      localStorage.setItem('scan_count', (scanCount + 1).toString());
      
      const mockResult = {
        condition: Math.random() > 0.5 ? 'Cataract' : 'Allergy',
        severity: Math.random() > 0.7 ? 'Severe' : Math.random() > 0.4 ? 'Moderate' : 'Mild',
        eye: Math.random() > 0.5 ? 'Right' : 'Left',
        confidence: Math.floor(Math.random() * 30 + 70),
        timestamp: new Date().toISOString()
      };
      
      const existingResults = JSON.parse(localStorage.getItem('scan_results') || '[]');
      existingResults.unshift(mockResult);
      localStorage.setItem('scan_results', JSON.stringify(existingResults));
      
      setIsAnalyzing(false);
      setLocation('/results');
    }, 2000);
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
          <h1 className="text-xl font-bold">Capture Eye Image</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            For best results: Good lighting, close-up of eye, steady hand, remove glasses
          </AlertDescription>
        </Alert>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Eye preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No image captured</p>
                  </div>
                )}
                
                {imagePreview && !isAnalyzing && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="h-8 w-8 text-green-500 bg-white rounded-full" />
                  </div>
                )}
              </div>

              {feedback && (
                <Alert className={feedback.includes('success') ? 'bg-green-50' : 'bg-blue-50'}>
                  <AlertDescription>{feedback}</AlertDescription>
                </Alert>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="h-12 bg-blue-500 hover:bg-blue-600"
                  disabled={isAnalyzing}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Capture
                </Button>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="h-12"
                  disabled={isAnalyzing}
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload
                </Button>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!imagePreview || isAnalyzing}
                className="w-full h-12 bg-green-500 hover:bg-green-600"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Image'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">Important Disclaimer</h4>
            <p className="text-sm text-yellow-800">
              AI analysis is preliminary and NOT a medical diagnosis. Always consult a qualified 
              ophthalmologist for professional evaluation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
