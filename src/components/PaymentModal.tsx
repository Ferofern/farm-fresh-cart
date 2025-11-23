import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Building2, Truck, Wallet, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  hasTransport: boolean;
}

type PaymentMethod = "card" | "transfer" | "cash" | "wallet";
type PaymentStatus = "idle" | "processing" | "success" | "error";

const PaymentModal = ({ isOpen, onClose, total, hasTransport }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [transactionId, setTransactionId] = useState("");

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const isCardValid = () => {
    return (
      cardNumber.replace(/\s/g, "").length === 16 &&
      cardName.length > 0 &&
      cardExpiry.length === 5 &&
      cardCvv.length === 3
    );
  };

  const isTransferConfirmed = () => paymentMethod === "transfer";
  const isCashEnabled = () => hasTransport;

  const canProceed = () => {
    if (paymentMethod === "card") return isCardValid();
    if (paymentMethod === "transfer") return isTransferConfirmed();
    if (paymentMethod === "cash") return isCashEnabled();
    if (paymentMethod === "wallet") return true;
    return false;
  };

  const handlePayment = async () => {
    setPaymentStatus("processing");
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      const txId = `TX${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setTransactionId(txId);
      setPaymentStatus("success");
      toast.success("¡Pago realizado exitosamente!");
    } else {
      setPaymentStatus("error");
      toast.error("Error al procesar el pago");
    }
  };

  const handleClose = () => {
    setPaymentStatus("idle");
    setCardNumber("");
    setCardName("");
    setCardExpiry("");
    setCardCvv("");
    setTransactionId("");
    onClose();
  };

  if (paymentStatus === "success") {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">¡Pago Exitoso!</h3>
            <p className="text-muted-foreground">Tu pedido ha sido confirmado</p>
            <div className="rounded-lg bg-muted p-4 w-full">
              <p className="text-sm text-muted-foreground mb-1">Número de transacción</p>
              <p className="text-lg font-mono font-bold text-foreground">{transactionId}</p>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Total pagado: <span className="font-bold text-primary">${total.toFixed(2)}</span></p>
              <p>Recibirás un correo de confirmación</p>
            </div>
            <Button onClick={handleClose} className="w-full" size="lg">
              Continuar Comprando
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (paymentStatus === "error") {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="rounded-full bg-destructive/10 p-4">
              <XCircle className="h-16 w-16 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Error en el Pago</h3>
            <p className="text-muted-foreground">No se pudo procesar tu pago. Por favor, intenta nuevamente.</p>
            <div className="flex gap-3 w-full">
              <Button onClick={() => setPaymentStatus("idle")} variant="outline" className="flex-1">
                Intentar de Nuevo
              </Button>
              <Button onClick={handleClose} className="flex-1">
                Volver
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Métodos de Pago</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Total a pagar:</span>
              <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Incluye IVA y costos de transporte
            </div>
          </div>

          <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="font-medium">Tarjeta de Crédito/Débito</span>
                </Label>
              </div>

              <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="transfer" id="transfer" />
                <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span className="font-medium">Transferencia Bancaria</span>
                </Label>
              </div>

              <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="cash" id="cash" disabled={!hasTransport} />
                <Label
                  htmlFor="cash"
                  className={`flex items-center gap-2 flex-1 ${!hasTransport ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="font-medium">Pago Contra Entrega</span>
                  {!hasTransport && <span className="text-xs text-muted-foreground">(No disponible)</span>}
                </Label>
              </div>

              <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Wallet className="h-5 w-5 text-primary" />
                  <span className="font-medium">Billetera Digital</span>
                </Label>
              </div>
            </div>
          </RadioGroup>

          {paymentMethod === "card" && (
            <div className="space-y-4 p-4 border rounded-lg bg-card">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                />
                <p className="text-xs text-muted-foreground">
                  Prueba: 4532 1234 5678 9010
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardName">Nombre del Titular</Label>
                <Input
                  id="cardName"
                  placeholder="JUAN PEREZ"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardExpiry">Fecha de Vencimiento</Label>
                  <Input
                    id="cardExpiry"
                    placeholder="MM/AA"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardCvv">CVV</Label>
                  <Input
                    id="cardCvv"
                    type="password"
                    placeholder="123"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "transfer" && (
            <div className="space-y-3 p-4 border rounded-lg bg-card">
              <h4 className="font-semibold">Datos Bancarios</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Banco:</span>
                  <span className="font-medium">Banco Agrícola Nacional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cuenta:</span>
                  <span className="font-medium font-mono">1234-5678-90-123456789</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Titular:</span>
                  <span className="font-medium">Marketplace Campo Mesa SA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Concepto:</span>
                  <span className="font-medium">Compra productos</span>
                </div>
              </div>
              <div className="pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  Realiza la transferencia y confirma el pago. Te enviaremos un correo con los detalles del pedido.
                </p>
              </div>
            </div>
          )}

          {paymentMethod === "wallet" && (
            <div className="p-4 border rounded-lg bg-card text-center">
              <p className="text-muted-foreground">
                Selecciona tu billetera digital preferida en el siguiente paso
              </p>
            </div>
          )}

          {paymentMethod === "cash" && hasTransport && (
            <div className="p-4 border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground">
                Pagarás en efectivo al momento de recibir tu pedido. Asegúrate de tener el monto exacto.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={handleClose} variant="outline" className="flex-1">
            Cancelar
          </Button>
          <Button
            onClick={handlePayment}
            disabled={!canProceed() || paymentStatus === "processing"}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {paymentStatus === "processing" ? "Procesando..." : "Confirmar Pago"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
