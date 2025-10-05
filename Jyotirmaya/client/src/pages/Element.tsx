import { AlertCircleIcon, CheckIcon, XIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Element = (): JSX.Element => {
  const colorSwatches = [
    { name: "FUSCHIA", color: "bg-[#E93D82]", code: "#E93D82" },
    { name: "IRIS", color: "bg-[#5B5FFF]", code: "#5B5FFF" },
    { name: "PEACH", color: "bg-[#FFB4A2]", code: "#FFB4A2" },
    { name: "ONYX", color: "bg-[#2D3748]", code: "#2D3748" },
    { name: "EVERGREEN", color: "bg-[#38B2AC]", code: "#38B2AC" },
    { name: "LIGHT SLATE", color: "bg-[#A0AEC0]", code: "#A0AEC0" },
    { name: "DORIAN", color: "bg-[#4A5568]", code: "#4A5568" },
  ];

  return (
    <div className="bg-neutral-50 w-full min-w-[685px] min-h-[492px] flex gap-8">
      <div className="w-[342.5px] h-[492px] bg-white p-6 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              header 1
            </h3>
            {colorSwatches.slice(0, 1).map((swatch) => (
              <Card key={swatch.name} className="w-[120px] shadow-sm">
                <CardContent className="p-0">
                  <div className={`${swatch.color} h-12 rounded-t-lg`}></div>
                  <div className="p-2">
                    <div className="text-xs font-bold">{swatch.name}</div>
                    <div className="text-[10px] text-gray-500">
                      {swatch.code}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-500">TextField/Default</div>
            <div className="text-xs text-gray-500">TextField text</div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              header 2
            </h3>
            {colorSwatches.slice(1, 2).map((swatch) => (
              <Card key={swatch.name} className="w-[120px] shadow-sm">
                <CardContent className="p-0">
                  <div className={`${swatch.color} h-12 rounded-t-lg`}></div>
                  <div className="p-2">
                    <div className="text-xs font-bold">{swatch.name}</div>
                    <div className="text-[10px] text-gray-500">
                      {swatch.code}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-500">TextField/Active</div>
            <Input
              defaultValue="TextField text"
              className="h-9 text-sm border-blue-500 focus-visible:ring-blue-500"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              subtitle
            </h3>
            {colorSwatches.slice(2, 3).map((swatch) => (
              <Card key={swatch.name} className="w-[120px] shadow-sm">
                <CardContent className="p-0">
                  <div className={`${swatch.color} h-12 rounded-t-lg`}></div>
                  <div className="p-2">
                    <div className="text-xs font-bold">{swatch.name}</div>
                    <div className="text-[10px] text-gray-500">
                      {swatch.code}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-500">TextField/Valid</div>
            <div className="relative">
              <Input
                defaultValue="email@domain.com"
                className="h-9 text-sm pr-8"
              />
              <CheckIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">body</h3>
            {colorSwatches.slice(3, 4).map((swatch) => (
              <Card key={swatch.name} className="w-[120px] shadow-sm">
                <CardContent className="p-0">
                  <div className={`${swatch.color} h-12 rounded-t-lg`}></div>
                  <div className="p-2">
                    <div className="text-xs font-bold text-white">
                      {swatch.name}
                    </div>
                    <div className="text-[10px] text-gray-300">
                      {swatch.code}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-500">TextField/Error</div>
            <div className="relative">
              <Input
                defaultValue="email@"
                className="h-9 text-sm pr-8 border-red-500 focus-visible:ring-red-500"
              />
              <AlertCircleIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              smaller text here
            </h3>
            {colorSwatches.slice(4, 5).map((swatch) => (
              <Card key={swatch.name} className="w-[120px] shadow-sm">
                <CardContent className="p-0">
                  <div className={`${swatch.color} h-12 rounded-t-lg`}></div>
                  <div className="p-2">
                    <div className="text-xs font-bold text-white">
                      {swatch.name}
                    </div>
                    <div className="text-[10px] text-gray-300">
                      {swatch.code}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-500">TextField/Disabled</div>
            <div className="relative">
              <Input
                defaultValue="TextField text"
                disabled
                className="h-9 text-sm pr-8 bg-gray-100"
              />
              <XIcon className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              one TITLE
            </h3>
            {colorSwatches.slice(5, 6).map((swatch) => (
              <Card key={swatch.name} className="w-[120px] shadow-sm">
                <CardContent className="p-0">
                  <div className={`${swatch.color} h-12 rounded-t-lg`}></div>
                  <div className="p-2">
                    <div className="text-xs font-bold">{swatch.name}</div>
                    <div className="text-[10px] text-gray-500">
                      {swatch.code}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-500">TextField/Multiline</div>
            <Textarea
              defaultValue="Multiline text field. Multiline text field. Multiline text field. Multiline text field. Multiline text field."
              className="text-sm min-h-[80px] resize-none"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 mb-2">
              BUTTON TEXT
            </h3>
            {colorSwatches.slice(6, 7).map((swatch) => (
              <Card key={swatch.name} className="w-[120px] shadow-sm">
                <CardContent className="p-0">
                  <div className={`${swatch.color} h-12 rounded-t-lg`}></div>
                  <div className="p-2">
                    <div className="text-xs font-bold">{swatch.name}</div>
                    <div className="text-[10px] text-gray-500">
                      {swatch.code}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-gray-700">Label</Label>
            <div className="text-xs text-gray-500">Form label text</div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-500">Helper</div>
            <div className="text-xs text-gray-500">Form helper text</div>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-500">Error</div>
            <Input
              defaultValue="TextField text"
              className="h-9 text-sm bg-gray-100"
            />
          </div>

          <div>
            <h3 className="text-xs font-semibold text-blue-600 mb-2">
              Link Text
            </h3>
          </div>
        </div>
      </div>

      <div className="mt-[145px] w-[282px] h-[202px] flex flex-col gap-[18px]">
        <h1 className="w-[276px] h-[88px] [font-family:'Inter',Helvetica] font-bold text-black text-[38px] tracking-[-0.72px] leading-[43.7px]">
          Build your own team library
        </h1>

        <p className="w-[278px] h-24 [font-family:'Inter',Helvetica] font-normal text-[#000000cc] text-sm tracking-[-0.08px] leading-6">
          Don&apos;t reinvent the wheel with every design. Team libraries let
          you share styles and components across files, with everyone on your
          team.
        </p>
      </div>
    </div>
  );
};
