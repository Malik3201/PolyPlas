import ImageKit from "imagekit";

let imagekitInstance: ImageKit | null = null;

export function getImageKit(): ImageKit {
  if (!imagekitInstance) {
    imagekitInstance = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    });
  }
  return imagekitInstance;
}

export function getImageKitAuthParams() {
  const ik = getImageKit();
  return ik.getAuthenticationParameters();
}

export async function deleteImageKitFile(fileId: string): Promise<void> {
  const ik = getImageKit();
  await ik.deleteFile(fileId);
}

export async function deleteImageKitFiles(fileIds: string[]): Promise<void> {
  const ik = getImageKit();
  if (fileIds.length === 0) return;
  await Promise.allSettled(fileIds.map((id) => ik.deleteFile(id)));
}
