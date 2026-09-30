type UploadResponse = {
  status: boolean;
  payload?: { url?: string };
  message?: string;
};

type UploadProductImageOptions = {
  file: File;
  fallbackMessage: string;
  tooLargeMessage: string;
};

export async function uploadProductImage({ file, fallbackMessage, tooLargeMessage }: UploadProductImageOptions) {
  const body = new FormData();
  body.append('image', file, file.name);

  const response = await fetch('/api/upload', { method: 'POST', body });
  if (response.status === 413) throw new Error(tooLargeMessage);

  const data = parseUploadResponse(await response.text());
  if (!response.ok || !data.payload?.url) throw new Error(data.message || fallbackMessage);

  return data.payload.url;
}

function parseUploadResponse(responseText: string): UploadResponse {
  if (!responseText) return { status: false };

  try {
    return JSON.parse(responseText) as UploadResponse;
  } catch {
    return { status: false };
  }
}
