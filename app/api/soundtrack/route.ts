// Kept for cached clients. The new player uses the site's audio catalogue.
export async function GET() {
  return Response.json({error:"Le lecteur a été mis à jour. Recharge la page Soundcheck."}, {
    status:410, headers:{"Cache-Control":"no-store"}
  });
}
